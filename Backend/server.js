// const express = require('express');
const dotenv = require('dotenv');
const { Server } = require("socket.io");
const { createServer } = require("http");
const connectMongo = require('./config/database');
// const path = require('path'); 

const app = require("./app");
const server = createServer(app);

dotenv.config({
    path: "./config/.env"
})

connectMongo();


// --------------------------deployment------------------------------

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   const frontendBuildPath = path.join(__dirname1, "../frontend/build");
//   console.log(frontendBuildPath);
//   app.use(express.static(frontendBuildPath));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(frontendBuildPath, "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// ---------------------------------------------------------------------

const port = process.env.PORT || 4000;


// const server = app.listen(port,()=>{
//     console.log(`app lisening at http://localhost:${port}`);
// })

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    // console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      // console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message received", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });

server.listen(port,()=>{
    console.log(`app lisening at http://localhost:${port}`);
})

