import React from 'react';

const Task = props => (
  <div className='allDivs' onMouseEnter={props.handleMouseHover} onMouseLeave={props.handleMouseHover} id={props.taskId}>
    <button
      style={props.task.status === 'complete' ? completeTaskButton : incompleteTaskButton}
      onClick={props.markComplete}
      className={props.taskIdx}
      id={props.taskId}
    />
    <input
      value={props.task.text}
      id={props.taskId}
      readOnly='true'
      style={props.task.status === 'complete' ? strikethroughStyle : plainTextStyle}
      onBlur={props.onBlurNoEdit}
      onKeyPress={props.onBlurNoEdit}
      onDoubleClick={props.doubleClickEdit}
      onChange={props.editTask}/>
    <button
      style={props.task.hovering ? deleteTaskButton : deleteTaskButtonNone}
      onClick={props.removeTask}
      className={props.taskIdx}
      id={props.taskId}>X</button>
  </div>
)

const strikethroughStyle = {
  cursor: 'default',
  textDecoration: 'line-through',
  width: '300px',
  border: 'none',
  color: 'lightgray',
}

const plainTextStyle = {
  cursor: 'default',
  textDecoration: 'none',
  width: '300px',
  border: 'none',
  color: '#404040',
}

const incompleteTaskButton = {
  borderRadius: '50%',
  backgroundColor: 'white',
  border: '.5px solid #79d279',
  width: '15px',
  height: '15px',
  marginLeft: '5px',
  marginRight: '5px',
}

const completeTaskButton = {
  borderRadius: '50%',
  backgroundColor: '#79d279',
  border: '.5px solid #79d279',
  width: '15px',
  height: '15px',
  marginLeft: '5px',
  marginRight: '5px',
}

const deleteTaskButton = {
  color: '#a82424',
  marginRight: '5px',
  display: 'block',
}

const deleteTaskButtonNone = {
  color: '#a82424',
  marginRight: '5px',
  display: 'none',
}

export default Task;
