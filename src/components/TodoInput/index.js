import React from 'react';

const TodoInput = props => (
  <div className="inpDivs">
    <button id="toggle" onClick={props.toggleTask} style={props.taskArr.length > 0 ? toggleStyle : toggleStyleNone}>v</button>
    <form onSubmit={props.handleSubmit}>
      <input
        id="mainInput"
        placeholder="What needs to be done?"
        type="text" name="inputTask"
        value={props.inputTask}
        onChange={props.handleChange} />
    </form>
  </div>
)

const toggleStyle = {
  visibility: 'visible'
}

const toggleStyleNone = {
  visibility: 'hidden'
}

export default TodoInput;
