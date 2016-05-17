
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
const todoRouter = require(__dirname + '/routes/todo_router');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/todo_db');

app.use('/', express.static(__dirname + 'index.html'));

app.get('*', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html');
});
app.use('/api', todoRouter);

app.use((req, res) => {
  res.status(404).json({ 'msg': '404 - Page Not Found!' });
});
app.listen(PORT, () => console.log('server up on port: ' + PORT));

