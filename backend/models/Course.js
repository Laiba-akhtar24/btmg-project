const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  level: {
    type: String
  },
  price: {
    type: Number
  },
  status: {
    type: String,
    default: "Active"
  },
  skills: {
    type: [String],
    default: []
  },
  sort: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Course", courseSchema);