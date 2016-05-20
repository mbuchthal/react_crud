import React from 'react';
import CreateTodo from './create-todo';
import TodosList from './todos-list';
import _ from 'lodash';

import request from 'superagent';

const url = 'http://localhost:3000/api/';

var todos = [];

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      todos
    };
  }

  componentDidMount() {
    request
      .get(url + 'todos')
      .end((err, res) => {
        if (err) throw err;
        todos = res.body;
        this.setState({ todos });
      });
  }

  render() {
    return (
      <div>
        <h1>React ToDos App</h1>
        <CreateTodo todos={this.state.todos} createTask={this.createTask.bind(this)} />
        <TodosList
          todos={this.state.todos}
          toggleTask={this.toggleTask.bind(this)}
          saveTask={this.saveTask.bind(this)}
          deleteTask={this.deleteTask.bind(this)}
        />
      </div>
    );
  }

  toggleTask(task) {
    const foundTodo = _.find(this.state.todos, todo => todo.task === task);
    foundTodo.isCompleted = !foundTodo.isCompleted;
    this.setState({ todos: this.state.todos });
  }

  createTask(task) {
    request
      .post(url + 'todos')
      .send({ task, isCompleted: false })
      .end((err, res) => {
        if (err) console.log('error in POST');
        this.state.todos.push({
          task,
          isCompleted: false
        });
        this.setState({ todos: this.state.todos });
      });
  }

  saveTask(oldTask, newTask) {
    var foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
    var id = foundTodo._id;
    console.log(foundTodo);
    foundTodo.task = newTask;
    request
      .put(url + 'todos/' + id)
      .send({ task: newTask })
      .end((err, res) => {
        if (err) console.log('error in PUT');
        this.setState({ todos: this.state.todos });
      });
  }

  deleteTask(taskToDelete) {
    var deleteTodo = _.find(this.state.todos, todo => todo.task === taskToDelete);
    _.remove(this.state.todos, todo => todo.task === taskToDelete);
    request
      .del(url + 'todos/' + deleteTodo._id)
      .end((err, res) => {
        if (err) console.log('error in PUT');
        this.setState({ todos: this.state.todos });
      });
  }
}
