import React, { Component } from 'react';
import axios from 'axios';
import TaskList from '../TaskList';
import TodoFooter from '../TodoFooter';
import TodoInput from '../TodoInput';

const apiGatewayUrl = 'https://tz90egdoq6.execute-api.us-east-1.amazonaws.com/test';

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
    this.getTodoItems = this.getTodoItems.bind(this);
    this.newTodoItem = this.newTodoItem.bind(this);
    this.deleteTodoItem = this.deleteTodoItem.bind(this);
    this.handleMouseHover = this.handleMouseHover.bind(this);
  }

  componentDidMount() {
    this.getTodoItems();
  }

  getTodoItems() {
    axios({
      method: 'get',
      url: apiGatewayUrl
    })
    .then((response) => {
      let taskArr = response.data.map(task => ({
        id: task.todoId,
        text: task.text,
        dateTime: task.dateTime,
        status: 'active',
        hovering: false,
      }));
      taskArr.sort((a, b) => {
        if (a.dateTime < b.dateTime) {
          return -1;
        } else if (a.dateTime > b.dateTime) {
          return 1;
        } else {
          return 0;
        }
      });
      this.setState({ taskArr, inputTask: '' });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  newTodoItem(text) {
    axios({
      method: 'post',
      url: apiGatewayUrl,
      data: { text }
    })
    .then((response) => {
      this.getTodoItems();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteTodoItem(todoId) {
    axios({
      method: 'delete',
      url: apiGatewayUrl,
      data: { todoId }
    })
    .then((response) => {
      this.getTodoItems();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit (e) {
    e.preventDefault();
    this.newTodoItem(this.state.inputTask);
  }

  removeTask (e) {
    console.log(e.target);
    this.deleteTodoItem(e.target.id);
  }

  markComplete (e) {
    const pos = this.state.taskArr.findIndex(task => task.id === e.target.id)
    let newTaskArr = this.state.taskArr.slice();
    if(newTaskArr[pos].status === 'complete') {
      newTaskArr[pos].status = 'active'
    }
    else{
      newTaskArr[pos].status = 'complete';
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
    this.state.taskArr.forEach(task => {
      if(task.status === 'complete') {
        this.deleteTodoItem(task.id);
      }
    })
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

  // doubleClickEdit(e){
  //   e.preventDefault();
  //   let target = e.target;
  //   let newArr = this.state.taskArr.slice();
  //   newArr[target.className].editable = false;
  //   this.setState({taskArr : newArr}, function() {
  //     target.focus();
  //   });
  // }

  // onBlurNoEdit(e){
  //   if (e.which === 13 || e.which === undefined) {
  //     let newArr = this.state.taskArr.slice();
  //     newArr[e.target.className].editable = true;
  //     this.setState({taskArr : newArr});
  //     e.target.blur();
  //   }
  // }

  // editTask(e){
  //   if (e.target.value.trim() === '') {
  //     this.removeTask(e);
  //   } else {
  //     let newArr = this.state.taskArr.slice();
  //     newArr[e.target.className].text = e.target.value;
  //     this.setState({taskArr : newArr});
  //   }
  // }

  handleMouseHover(e) {
    console.log(e.target);
    const pos = this.state.taskArr.findIndex(task => task.id === e.target.id)
    let newArr = this.state.taskArr.slice();
    newArr[pos].hovering = !newArr[pos].hovering;
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
