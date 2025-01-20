const mongoose = require('mongoose');

const presentationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  article: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],

}, {
  timestamps: true
});

const Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = Presentation;
