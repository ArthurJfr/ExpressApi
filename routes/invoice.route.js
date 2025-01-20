const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoice.controller');

router.post('/generate', generateInvoice);
    

module.exports = router; 