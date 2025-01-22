const express = require("express");
const fs = require("fs");
const { writeLog } = require("./logfunc");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const articleRoutes = require("./routes/article.route");
const presentationRoutes = require("./routes/presentation.route");
const requestLogger = require("./middleware/requestLoggerMiddleware");
const messageEmitter = require("./event");
const invoiceRoutes = require('./routes/invoice.route');
require('./events/invoiceHandler');
const cors = require('cors');
const compression = require('compression');
const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const logger = require('./config/logger');
const helmet = require('helmet');
const redis = require('ioredis');
// correction sur https://gitlab.com/theodac/3bcinodelinux.git


// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on("connected", () => {
//   console.log("Connected to MongoDB");
// });

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(compression({
  level: 6,
  threshold: 100 * 1024,
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));
app.use('/invoices', invoiceRoutes);

app.use(requestLogger);

app.use("/articles", articleRoutes);
app.use("/presentations", presentationRoutes);

app.get("/", (req, res) => {
  res.send("Bonjour le monde");
});
app.get('/test-error', (req, res) => {
  try {
    // Simuler une erreur critique
    throw new Error('Ceci est une erreur critique de test');
  } catch (error) {
    logger.error('Erreur critique de test:', error);
    res.status(500).send('Erreur générée avec succès');
  }
});
redis.on('connect', () => {
  console.log('Connected to Redis');
});
redis.on('error', (error) => {
  console.error('Erreur Redis:', error);
});
app.listen(process.env.PORT, () => {
  writeLog("server2.log",`Server is running on port ${process.env.PORT}`);
  messageEmitter.emit("message_call", 'Serveur');
  console.log(`Server is running on port ${process.env.PORT}`);
});

// Gestion des erreurs globales
process.on('uncaughtException', (error) => {
  logger.error('Erreur non gérée:', error);
  logger.emitErrs = true;
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promesse rejetée non gérée:', reason);
  logger.emitErrs = true;
});
app.use(helmet());
