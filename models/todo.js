
const mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
  task: { type: String, unique: true },
  description: { type: String, default: '' },
  isCompleted: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);
