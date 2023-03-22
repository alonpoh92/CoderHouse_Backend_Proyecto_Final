const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  id: { type: String, required: true, unique: true },
  parent: { type: String },
  email: { type: String, required: true,
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      "Invalid email",
    ],
  },
  type: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, required: true }
});

module.exports = MessageSchema;