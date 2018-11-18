import React from 'react';
import Task from '../Task';

const TaskList = props => (
  props.taskArr.map((task, idx) => {
    if (props.filter === 'all' ||
      (props.filter === 'active' && task.status === 'active')||
      (props.filter === 'complete' && task.status === 'complete')) {
        return (
          <Task
            task={task}
            key={idx}
            taskIdx={idx}
            taskId={task.id}
            onBlurNoEdit={props.onBlurNoEdit}
            doubleClickEdit={props.doubleClickEdit}
            removeTask={props.removeTask}
            editTask={props.editTask}
            markComplete={props.markComplete}
            handleMouseHover={props.handleMouseHover}/>
        )
      }
      else { return null }
    }
  )
)

export default TaskList;
