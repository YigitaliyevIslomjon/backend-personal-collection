const express = require("express");
const mongoose = require("mongoose");
const indexRoute = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const authenticateToken = require("./middleware/auth");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("mongodb is connected");
  })
  .catch((err) => {
    console.log("error connecting", err);
  });

app.use(express.json());
app.use(cors());

app.use("/api", indexRoute);
app.use(errorHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Started up at prot ${PORT}`);
});
