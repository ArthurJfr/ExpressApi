const PDFDocument = require('pdfkit');
const fs = require('fs');
const invoiceEmitter = require('./invoiceEmitter');

invoiceEmitter.on('generate_invoice', ({ data, response }) => {
  const doc = new PDFDocument();
  const fileName = `facture-${Date.now()}.pdf`;
  const writeStream = fs.createWriteStream(fileName);

  doc.pipe(writeStream);

  // En-tête
  doc.fontSize(25).text('FACTURE', { align: 'center' });
  doc.moveDown();

  // Date
  doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString('fr-FR')}`);
  doc.moveDown();

  // Contenu du body
  doc.fontSize(14).text('Détails de la facture:');
  doc.moveDown();

  Object.entries(data).forEach(([key, value]) => {
    doc.fontSize(12).text(`${key}: ${value}`);
  });

  doc.end();

  writeStream.on('finish', () => {
    response.status(200).json({
      message: 'Facture générée avec succès',
      fileName: fileName
    });
  });
}); 