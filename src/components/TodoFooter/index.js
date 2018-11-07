import React from 'react';

const TodoFooter = props => {
  if (props.taskArr.length > 0 ) {
    let activeCount = props.activeCount();
    return (
      <div className="allDivs">
        <span className="tdfooter" id="activeCount">
          {activeCount === 1 ? activeCount + " item left" : activeCount + " items left"}
        </span>
        <div>
          <button className="tdfooter" id="all" onClick={props.filter} style={props.filterState === 'all' ? selectedButton : null}>all</button>
          <button className="tdfooter" id="active" onClick={props.filter} style={props.filterState === 'active' ? selectedButton : null}>active</button>
          <button className="tdfooter" id="complete" onClick={props.filter} style={props.filterState === 'complete' ? selectedButton : null}>completed</button>
        </div>
        <button className="tdfooter" style={props.clearedCount() > 0 ? clearStyle : clearStyleNone} onClick={props.clearCompleted}>clear completed</button>
      </div>
    );
  } else { return null }
}

const selectedButton = {
  border: '.5px solid lightgray',
}

const clearStyle = {
  width: '100px',
  visibility: 'visible',
}

const clearStyleNone = {
  width: '100px',
  visibility: 'hidden',
}

export default TodoFooter;
