const Notifications = require("../models/notificationsModels");

const deleteNotification = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const { id: userId } = ctx.state.user;

    const deletedNotification = await Notifications.remove(userId, id);
    if (deletedNotification) {
      ctx.body = { message: "Deleted successful", data: deletedNotification };
    } else {
      ctx.body = { message: "Can't find todo with this ID" };
    }

    await next();
  } catch (error) {
    ctx.app.emit("error", error, ctx);
  }
};

module.exports = {
  deleteNotification,
};
