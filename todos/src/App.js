import React, { Component } from 'react';
import './App.css';
import TodoList from './components/todo-list.js'
import CreateTodo from './components/create-todo.js'
import _ from 'lodash'


const todos = [
  {
    task:'Make react tutorial',
    isComplete:false
  },
  {
    task:'eat breakfast',
    isComplete:true
  }

]

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      todos
    }
  }
  render() {
    return (
      <div className="App">
        <div className="content">
        <h1>Todo List</h1>
          <TodoList toggleTask={this.toggleTask.bind(this)}
                saveTask={this.saveTask.bind(this)}
                deleteTask={this.deleteTask.bind(this)}
                todos={this.state.todos}/>
          <CreateTodo todos={this.state.todos}
                      createTask={this.createTask.bind(this)}
            />
        </div>
      </div>
    );
  }
  createTask(task){
    this.state.todos.push({
      task,
      isComplete:false
    })
    this.setState({
      todos:this.state.todos
    })
  }
  toggleTask(task){
    const foundTodo=_.find(this.state.todos,todo => todo.task === task);
    foundTodo.isComplete = !foundTodo.isComplete
    this.setState({todos:this.state.todos})

  }
  saveTask(oldTask,newTask){
    const foundTodo=_.find(this.state.todos,todo=>todo.task===oldTask);
    foundTodo.task=newTask;
    this.setState({todos:this.state.todos})
  }
  deleteTask(taskToDelete){
    _.remove(this.state.todos,todo=>todo.task===taskToDelete);
    this.setState({todos:this.state.todos})
  }
}


export default App;
