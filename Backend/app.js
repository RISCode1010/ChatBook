const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // Corrected spelling
const cors = require('cors');
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(cookieParser()); // Corrected middleware name

const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({
    limit: "50mb"
}));

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

app.get("/",(req,res)=>{
    res.json("server is ready")
})

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

const userRoutes = require('./routes/userRoute');
const messageRoutes = require('./routes/messageRoute');
const chatRoutes = require('./routes/chatRoute');

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
