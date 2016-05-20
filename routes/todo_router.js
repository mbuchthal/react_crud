
const Router = require('express').Router;
const Todo = require(__dirname + '/../models/todo');
const bodyParser = require('body-parser').json();
const serverErrorHandler = require(__dirname + '/../lib/error_handler');

var todoRouter = module.exports = exports = Router();

todoRouter.post('/todos', bodyParser, (req, res) => {
  var newTodo = new Todo(req.body);
  newTodo.save((err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

todoRouter.get('/todos', (req, res) => {
  Todo.find(null, (err, data) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json(data);
  });
});

todoRouter.put('/todos/:id', bodyParser, (req, res) => {
  var todoData = req.body;
  delete todoData._id;
  Todo.findByIdAndUpdate({ _id: req.params.id }, todoData, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({ msg: 'updated' });
  });
});

todoRouter.delete('/todos/:id', (req, res) => {
  Todo.remove({ _id: req.params.id }, (err) => {
    if (err) return serverErrorHandler(err, res);

    res.status(200).json({ msg: 'deleted' });
  });
});
