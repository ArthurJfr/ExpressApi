const express = require("express");
const fs = require("fs");
const { writeLog } = require("./logfunc");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const articleRoutes = require("./routes/article.route");
const presentationRoutes = require("./routes/presentation.route");
const requestLogger = require("./middleware/requestLogger");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use("/articles", articleRoutes);
app.use("/presentations", presentationRoutes);

app.get("/", (req, res) => {
  res.send("Bonjour le monde");
});

app.listen(process.env.PORT, () => {
  writeLog("server2.log",`Server is running on port ${process.env.PORT}`);
    
  console.log(`Server is running on port ${process.env.PORT}`);
});
