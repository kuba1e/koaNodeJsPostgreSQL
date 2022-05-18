const emitEvent = (ctx, eventType, data = {}) => {
  ctx.io.sockets.sockets.forEach((value, key) => {
    if (key !== ctx.state.user.socketId) {
      value.emit(eventType, data);
    }
  });
};

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

module.exports = {
  emitEvent,
  getCurrentDate,
};
