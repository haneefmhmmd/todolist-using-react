import React from 'react';

export default (props) => (
    <div style ={{display:"flex",justifyContent : "center"}}
    className = 'todo'>
        <div
        className = 'todo-content'
    style = {{
        textDecoration : props.todo.complete ? 'line-through' : '' 
    }}
    onClick={props.toggleComplete}
    >
        {props.todo.text}
   </div>
    <div>
        <button className='closeButton' onClick={props.deleteTodo}>X</button>
    </div>
    </div>
    );
    