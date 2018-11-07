import React from 'react';

const Task = props => (
  <div className={[props.taskId, 'allDivs'].join(' ')} onMouseEnter={props.handleMouseHover} onMouseLeave={props.handleMouseHover}>
    <button
      style={props.task.status === 'complete' ? completeTaskButton : incompleteTaskButton}
      onClick={props.markComplete}
      className={props.taskId} />
    <input
      value={props.task.text}
      readOnly={props.task.editable}
      className={props.taskId}
      style={props.task.status === 'complete' ? strikethroughStyle : plainTextStyle}
      onBlur={props.onBlurNoEdit}
      onKeyPress={props.onBlurNoEdit}
      onDoubleClick={props.doubleClickEdit}
      onChange={props.editTask}/>
    <button
      style={props.task.hovering ? deleteTaskButton : deleteTaskButtonNone}
      onClick={props.removeTask}
      className={props.taskId}
    id="deleteTask">X</button>
  </div>
)

const strikethroughStyle = {
  textDecoration: 'line-through',
  width: '300px',
  border: 'none',
  color: 'lightgray',
}

const plainTextStyle = {
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
