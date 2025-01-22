const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const nodemailer = require('nodemailer');

// Configuration du transport email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Fonction d'envoi d'email pour les erreurs critiques
const sendCriticalErrorEmail = async (error) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: 'Erreur Critique Détectée',
      text: `Une erreur critique est survenue: ${error.message}\n\nStack: ${error.stack}`
    });
  } catch (err) {
    console.error('Erreur lors de l\'envoi de l\'email:', err);
  }
};

// Format personnalisé
const customFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'MM-DD-YYYY HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Configuration des transports
const logger = winston.createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    // Logs d'information
    new DailyRotateFile({
      filename: 'logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'info',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // Logs d'avertissement
    new DailyRotateFile({
      filename: 'logs/warn-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'warn',
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // Logs d'erreur
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

// Gestion des erreurs critiques
logger.on('error', async (error) => {
  await sendCriticalErrorEmail(error);
});

module.exports = logger; 