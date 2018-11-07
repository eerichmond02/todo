import React, { Component } from 'react';
import TaskList from '../TaskList';
import TodoFooter from '../TodoFooter';
import TodoInput from '../TodoInput';

class TaskItem {
  constructor (text){
    this.text = text;
    this.status = 'active';
    this.editable = true;
    this.hovering = false;
  }
}

class Todo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      taskArr: [],
      inputTask: '',
      filter: 'all',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.markComplete = this.markComplete.bind(this);
    this.activeCount = this.activeCount.bind(this);
    this.clearedCount = this.clearedCount.bind(this);
    this.filter = this.filter.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.doubleClickEdit = this.doubleClickEdit.bind(this);
    this.onBlurNoEdit = this.onBlurNoEdit.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    let newTask = new TaskItem(this.state.inputTask);
    this.setState({taskArr: this.state.taskArr.concat(newTask), inputTask: ''});
  }

  removeTask (e) {
    let newTaskArr = this.state.taskArr.slice();
    newTaskArr.splice(e.target.className, 1);
    this.setState({taskArr: newTaskArr});
  }

  markComplete (e) {
    let newTaskArr = this.state.taskArr.slice();
    if(newTaskArr[e.target.className].status === 'complete') {
      newTaskArr[e.target.className].status = 'active'
    }
    else{
      newTaskArr[e.target.className].status = 'complete';
    }
    this.setState({taskArr: newTaskArr});
  }

  activeCount (e) {
    let taskCount = 0;
    for(let i=0; i<this.state.taskArr.length; i++) {
      if(this.state.taskArr[i].status === 'active') {
        taskCount++;
      }
    }
      return taskCount;
  }

  clearedCount (e) {
    let taskCount = 0;
    for(let i=0; i<this.state.taskArr.length; i++) {
      if(this.state.taskArr[i].status === 'complete') {
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
    if (e.target.style.color === 'black') { e.target.style.color = 'lightgrey'; }
    else { e.target.style.color = 'black'; }
    for(let i = 0 ; i < this.state.taskArr.length ; i++){
      if(this.state.taskArr[i].status === 'active'){
        activeFlag = true;
        break;
      }
    }
    let newArr = this.state.taskArr.map((task) => {
      if(activeFlag && task.status === 'active') {
        task.status = 'complete';
      } else if(!activeFlag) {
        task.status = 'active';
      }
      return task;
    });
    this.setState({taskArr : newArr});
  }

  doubleClickEdit(e){
    e.preventDefault();
    let target = e.target;
    let newArr = this.state.taskArr.slice();
    newArr[target.className].editable = false;
    this.setState({taskArr : newArr}, function() {
      target.focus();
    });
  }

  onBlurNoEdit(e){
    if (e.which === 13 || e.which === undefined) {
      let newArr = this.state.taskArr.slice();
      newArr[e.target.className].editable = true;
      this.setState({taskArr : newArr});
      e.target.blur();
    }
  }

  editTask(e){
    if (e.target.value.trim() === '') {
      this.removeTask(e);
    } else {
      let newArr = this.state.taskArr.slice();
      newArr[e.target.className].text = e.target.value;
      this.setState({taskArr : newArr});
    }
  }

  handleMouseHover(e) {
    let position = e.target.classList[0];
    let newArr = this.state.taskArr.slice();
    newArr[position].hovering = !newArr[position].hovering;
    this.setState({taskArr : newArr});
  }


  render() {
    return (
      <div className="parentDiv">
        <TodoInput
          inputTask={this.state.inputTask}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          toggleTask={this.toggleTask}
          taskArr={this.state.taskArr}
        />
        <TaskList
          taskArr={this.state.taskArr}
          onBlurNoEdit={this.onBlurNoEdit}
          doubleClickEdit={this.doubleClickEdit}
          removeTask={this.removeTask}
          editTask={this.editTask}
          markComplete={this.markComplete}
          filter={this.state.filter}
          handleMouseHover={this.handleMouseHover}
        />
        <TodoFooter
          activeCount={this.activeCount}
          clearedCount={this.clearedCount}
          filter={this.filter}
          filterState={this.state.filter}
          clearCompleted={this.clearCompleted}
          taskArr={this.state.taskArr}
        />
      </div>
    );
  }

}

export default Todo;
