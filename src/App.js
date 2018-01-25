import React, { Component } from 'react';
import './App.css';

const Task = (props) => (
  <div>
    <button onClick={props.markComplete} className={props.taskId}>Complete</button>
    <span>{props.task.text}</span>
    <button onClick={props.removeTask} className={props.taskId}>Delete</button>
  </div>
)

const TaskList = (props) => (
  props.taskArr.map((task, idx) => (
    <Task task={task} key={idx} taskId={idx} removeTask={props.removeTask} markComplete={props.markComplete}/>
  ))
)

const Input = (props) => (
  <div>
    <form onSubmit={props.handleSubmit}>
      <input type="text" name="inputTask" value={props.inputTask} onChange={props.handleChange}></input>
    </form>
  </div>
)

const TodoFooter = (props) => (
  <div>
    <p>Todo Footer (insert filter buttons here)</p>
  </div>
)

class TaskItem {
  constructor (text){
    this.text = text;
    this.status = 'active';
  }
}

class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      taskArr: [],
      inputTask: '',
      filter: 'all'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.markComplete = this.markComplete.bind(this);
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    let newTask = new TaskItem(this.state.inputTask);
    let newTaskArr = this.state.taskArr;
    newTaskArr.push(newTask);
    this.setState({taskArr: newTaskArr, inputTask: ''});
  }

  removeTask (e) {
    let newTaskArr = this.state.taskArr;
    newTaskArr.splice(e.target.className, 1);
    this.setState({taskArr: newTaskArr});
  }

  markComplete (e) {
    let newTaskArr = this.state.taskArr;
    newTaskArr[e.target.className].status = 'complete';
    console.log(e.target.eventId);
    this.setState({taskArr: newTaskArr});
  }

  render() {
    return (
      <div>
        <p>Todo class</p>
        <Input inputTask={this.state.inputTask} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        <TaskList taskArr={this.state.taskArr} removeTask={this.removeTask} markComplete={this.markComplete}/>  
        <TodoFooter />      
      </div>
    );
  }

}

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">todos</h1>
      </header>
      <Todo />
      <footer>
        <p>Footer text!</p>
      </footer>
    </div>
  );
}

export default App;
