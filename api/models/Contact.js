const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  consent: Boolean,

  replied: {
    type: String,
    default: "Pending"
  },

  viewed: {
    type: String,
    default: "Not Viewed"
  }
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);