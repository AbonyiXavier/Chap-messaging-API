class WebSockets {
    users = [];
    connection(client) {
      // event fired when the chat room is disconnected
      client.on("disconnect", () => {
        this.users = this.users.filter((user) => user.socketId !== client.id);
      });
      // add identity of user mapped to the socket id
      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });
      });
      // subscribe person to chat & other user as well
      client.on("subscribe", (channel, otherUserId = "") => {
        this.subscribeOtherUser(channel, otherUserId);
        client.join(channel);
      });
      // mute a chat room
      client.on("unsubscribe", (channel) => {
        client.leave(channel);
      });
    }
  
    subscribeOtherUser(channel, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(channel);
        }
      });
    }
  }
  
  export default new WebSockets();