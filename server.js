const express = require("express");
const mongoose = require("mongoose");
const indexRoute = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const isEnvProduction = process.env.NODE_ENV === "production";
mongoose
  .connect(
    isEnvProduction ? process.env.MONGODB_URI : process.env.MONGODB_URI_local,
    {
      useNewUrlParser: true,
    }
  )
  .then((res) => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log("error connecting", err);
  });

const server = http.createServer(app);
const io = socketIO(server, {
  transports: ["polling"],
  cors: {
    origin: isEnvProduction ? process.env.URL : process.env.LOCAL_URL,
    methods: ["GET", "POST"],
    credential: true,
  },
});

io.on("connection", (socket) => {
  socket.off("disconnect", () => {
    socket.close();
  });
});

app.locals.io = io;
exports = module.exports = app;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use("/api", indexRoute);
app.use(errorHandler);
//do something in production

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Started up at prot ${PORT}`);
});
