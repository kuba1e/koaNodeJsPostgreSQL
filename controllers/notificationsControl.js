const Notifications = require("../models/notificationsModels");

const { emitEvent } = require("../helpers/helpers");

const deleteNotification = async (ctx, next) => {
  try {
    const id = ctx.params.id;
    const { id: userId } = ctx.state.user.userData;

    const deletedNotification = await Notifications.remove(userId, id);
    if (deletedNotification) {
      ctx.body = { message: "Deleted successful", data: deletedNotification };
      emitEvent(ctx, "deleted-notification", deletedNotification.id);
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
