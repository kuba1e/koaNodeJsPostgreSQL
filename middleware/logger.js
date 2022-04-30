const fs = require("fs");

const getActualRequestTime = (start) => {
  const toNSec = 1e9;
  const toMSec = 1e6;
  const diff = process.hrtime(start);
  return (diff[0] * toNSec + diff[1]) / toMSec;
};

const logger = (ctx, next) => {
  try {
    const {
      request: { url, method },
    } = ctx;
    const {
      response: { status, header },
    } = ctx;

    const currentDate = new Date();
    let formatedDate =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate() +
      " " +
      currentDate.getHours() +
      ":" +
      currentDate.getMinutes() +
      ":" +
      currentDate.getSeconds();
    const start = process.hrtime();
    const requestDuration = getActualRequestTime(start);

    const log = `[${formatedDate}] method=${
      method
    } path="${url}" status=${status} request-duration=${
      requestDuration + "ms"
    }`;

    fs.appendFile("log/request-log.txt", log + "\n", (error) => {
      if (error) {
        throw new Error(error);
      }
    });

    console.log(log);

    next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = logger;
