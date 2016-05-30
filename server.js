
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const todoRouter = require(__dirname + '/routes/todo_router');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/todo_db');

const baseRouter = express.Router();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  next();
});

app.use('/', express.static(__dirname));

app.use('/api', todoRouter);

app.use((req, res) => {
  res.status(404).json({ 'msg': '404 - Page Not Found!' });
});
app.listen(PORT, () => console.log('server up on port: ' + PORT));

