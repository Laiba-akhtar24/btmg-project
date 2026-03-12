const mongoose = require("mongoose");

const LaunchDateSchema = new mongoose.Schema({

  course: {
    type: String,
    required: true
  },

  level: {
    type: String,
    required: true
  },

  launch_date: {
    type: String,
    required: true
  },

  enrollments: {
    type: Number,
    default: 0
  },

  inquiries: {
    type: Number,
    default: 0
  }

});

module.exports = mongoose.model("LaunchDate", LaunchDateSchema);