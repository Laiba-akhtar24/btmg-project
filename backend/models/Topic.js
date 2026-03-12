const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  courseId: String,
  title: String,
  description: String,
  sort: Number,
  status: {
    type: String,
    default: 'Inactive'
  }
});

module.exports = mongoose.model('Topic', topicSchema);