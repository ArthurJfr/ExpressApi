const fs = require('fs');
const invoiceEmitter = require('../events/invoiceEmitter');

exports.generateInvoice = async (req, res) => {
  try {
    // Émettre l'événement avec les données de la requête
    invoiceEmitter.emit('generate_invoice', {
      data: req.body,
      response: res
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la génération de la facture",
      error: error.message
    });
  }
}; 