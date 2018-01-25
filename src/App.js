import React, { Component } from 'react';
import './App.css';

const Task = (props) => (
  <div className="allDivs">
    <button id="complete" onClick={props.markComplete} className={props.taskId}>Complete</button>
    <input value={props.task.text} readOnly={props.task.editable} className={props.taskId} onBlur={props.onBlurNoEdit} onDoubleClick={props.doubleClickEdit} onChange={props.editTask}></input>
    <button id="delete" onClick={props.removeTask} className={props.taskId}>Delete</button>
  </div>
)

const TaskList = (props) => (
  props.taskArr.map((task, idx) => {
    if(props.filter === 'all' ||
      (props.filter === 'active' && task.status === 'active')||
      (props.filter === 'complete' && task.status === 'complete')){
        return (<Task task={task} key={idx} taskId={idx} onBlurNoEdit={props.onBlurNoEdit} doubleClickEdit={props.doubleClickEdit} removeTask={props.removeTask} editTask={props.editTask} markComplete={props.markComplete}/>)
      }
      else {return}
    }
  )
)

const Input = (props) => (
  <div className="inpDivs">
    <button id="toggle" onClick={props.toggleTask}>Toggle</button>
    <form onSubmit={props.handleSubmit}>
      <input id="mainInput" type="text" name="inputTask" value={props.inputTask} onChange={props.handleChange}></input>
    </form>
  </div>
)

const TodoFooter = (props) => (
  <div className="allDivs">
    <span className="tdfooter">{props.activeCount() + " items left."}</span>
    <div>
      <button className="tdfooter" id="all" onClick={props.filter}>all</button>
      <button className="tdfooter" id="active" onClick={props.filter}>active</button>
      <button className="tdfooter" id="complete" onClick={props.filter}>completed</button>
    </div>
    <button className="tdfooter" id="clear" onClick={props.clearCompleted}>clear completed</button>
  </div>
)


class TaskItem {
  constructor (text){
    this.text = text;
    this.status = 'active';
    this.editable = true;
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
    this.activeCount = this.activeCount.bind(this);
    this.filter = this.filter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.doubleClickEdit = this.doubleClickEdit.bind(this);
    this.onBlurNoEdit = this.onBlurNoEdit.bind(this);
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
    if(newTaskArr[e.target.className].status === 'complete'){
          newTaskArr[e.target.className].status = 'active'
    }
    else{
      newTaskArr[e.target.className].status = 'complete';
    }
    this.setState({taskArr: newTaskArr});
  }

  activeCount (e) {
    let taskCount = 0;
    for(let i=0; i<this.state.taskArr.length; i++){
      if(this.state.taskArr[i].status === 'active') {
        taskCount++;
      }
    }
      return taskCount;
  }

  filter (e){
    this.setState({filter: e.target.id})
  }

  clearCompleted (e){
    let newArr = [];

    newArr = this.state.taskArr.filter(task => {
      return task.status === 'active';
    });

    this.setState({taskArr: newArr});
  }

  toggleTask(e){
    let activeFlag = false;
    for(let i = 0 ; i < this.state.taskArr.length ; i++){
      if(this.state.taskArr[i].status === 'active'){
        activeFlag = true;
        break;
      }
    }
    let newArr = this.state.taskArr.map((task) => {
      if(activeFlag && task.status === 'active'){
        task.status = 'complete';
      }else if(!activeFlag){
        task.status = 'active';
      }
      return task;
    });
    this.setState({taskArr : newArr});
  }

  doubleClickEdit(e){
    let newTask = this.state.taskArr[e.target.className];
    newTask.editable = false;
    let newArr = this.state.taskArr;
    newArr[e.target.className] = newTask;
    this.setState({taskArr : newArr})
  }

  onBlurNoEdit(e){
    let newTask = this.state.taskArr[e.target.className];
    newTask.editable = true;
    let newArr = this.state.taskArr;
    newArr[e.target.className] = newTask;
    this.setState({taskArr : newArr})
  }

  editTask(e){
    let newTask = this.state.taskArr[e.target.className];
    newTask.text = e.target.value;
    let newArr = this.state.taskArr;
    newArr[e.target.className] = newTask;
    this.setState({taskArr : newArr})
  }

  render() {
    return (
      <div className="parentDiv">
        <Input inputTask={this.state.inputTask} handleChange={this.handleChange} handleSubmit={this.handleSubmit} toggleTask={this.toggleTask}/>
        <TaskList taskArr={this.state.taskArr} onBlurNoEdit={this.onBlurNoEdit} doubleClickEdit={this.doubleClickEdit} removeTask={this.removeTask} editTask={this.editTask} markComplete={this.markComplete} filter={this.state.filter}/>  
        <TodoFooter activeCount={this.activeCount} filter={this.filter} clearCompleted={this.clearCompleted} />      
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
        <p className="tdfooter" >Double-click to edit a todo.</p>
      </footer>
    </div>
  );
}

export default App;
