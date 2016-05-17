
const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: { type: String },
  isCompleted: { type: Boolean },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
