const emitEvent = (ctx, eventType, data = {}) => {
  ctx.io.sockets.sockets.forEach((value, key) => {
    if (key !== ctx.state.user.socketId) {
      value.emit(eventType, data);
    }
  });
};

module.exports = {
  emitEvent
}