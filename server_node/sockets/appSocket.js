const iosocket = require("socket.io");

exports.createSocket = (server) => {
  const io = iosocket(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // socket create client event
    socket.on("clientEvent", (msg) => {
      io.sockets.emit("nodeEvent", "New message:" + msg);
    });

    // socket create client second event
    socket.on("clientObjEvent", (item) => {
      io.sockets.emit("nodeObjEvent", item);
    });

    socket.on("typing", (id, name, lastName) => {
      const fullName = `${name} ${lastName}`;
      socket.broadcast.emit("typing-from-server", id, fullName);
    });

    socket.on("message_delete", (messageId) => {
      console.log(messageId);
      io.sockets.emit("message_delete_event", messageId);
    });
  });
};
