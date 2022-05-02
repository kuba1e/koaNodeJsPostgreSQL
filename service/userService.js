const db = require("../db");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const { sendActivationMail } = require("./mailService");
const {
  generateTokens,
  saveToken,
  removeToken,
  validateRefreshToken,
  validateAccessToken,
  findToken,
} = require("./tokenService");
const UserDto = require("../dtos/userDto");

const userRegistration = async (email, password) => {
  try {
    const candidate = await db.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );
    if (Object.keys(candidate.rows).length) {
      throw new Error(`User with this email: ${email}, already exist`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await db.query(
      "INSERT INTO users (email, password,activation_link) values ($1, $2,$3) RETURNING *",
      [email, hashPassword, activationLink]
    );

    await sendActivationMail(
      email,
      `http://localhost:4000/activation/${activationLink}`
    );

    const userDto = new UserDto(user.rows[0]);

    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const userActivation = async (activationLink) => {
  const user = await db.query(
    "SELECT * FROM users WHERE activation_link= $1 ",
    [activationLink]
  );
  if (!Object.keys(user.rows).length) {
    throw new Error("Wrong activation link");
  }

  await db.query(
    "UPDATE users SET is_activated =$1 WHERE activation_link= $2",
    [true, activationLink]
  );
};

const userLogin = async (email, password) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!Object.keys(user.rows).length) {
      throw new Error("Cannot find user with this email");
    }

    const isPasswordsEqual = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (!isPasswordsEqual) {
      throw new Error("Password is wrong");
    }

    if(!user.rows[0].is_activated){
      throw new Error("Email is not activated");

    }

    const userDto = new UserDto(user.rows[0]);

    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const userLogout = async (refreshToken) => {
  const token = await removeToken(refreshToken);
  return token;
};

const userRefreshToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error("User is unauthorized");
    }

    const userData = await validateRefreshToken(refreshToken);
    const tokenFromDb = await findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw new Error("User is unauthorized");
    }

    const user = await db.query("SELECT * FROM users WHERE id =$1", [
      userData.id,
    ]);

    const userDto = new UserDto(user.rows[0]);

    const tokens = generateTokens({ ...userDto });

    await saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  userRegistration,
  userActivation,
  userLogout,
  userLogin,
  userRefreshToken,
};
