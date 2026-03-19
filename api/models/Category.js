const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  order: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);