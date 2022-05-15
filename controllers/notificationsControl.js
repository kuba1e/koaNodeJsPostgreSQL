const Notifications = require("../models/notificationsModels");

const getNotifications = async (ctx, next) => {
  try {
    const { id: userId } = ctx.state.user;
    const notifications = await Notifications.findAll(userId);
    ctx.body = { message: "Notifications found successful", data: { notifications } };

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};




module.exports ={
  getNotifications
}