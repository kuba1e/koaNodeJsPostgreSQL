const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "yakov.petryk@gmail.com",
    pass: "Yakov7832!!!",
  },
});

const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: "yakov.petryk@gmail.com",
    to,
    subject: 'Account activation',
    text:'',
    html:`
      <div>
      <h1>For activate account, please follow the link</h1>
      <a href='${link}'>Activation link</a>
      </div>

    `
  });
};

module.exports = {
  sendActivationMail,
};
