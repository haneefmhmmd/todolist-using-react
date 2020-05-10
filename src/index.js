import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoForm from './todoform';
import Todo from './Todo';
class APP extends React.Component {
  constructor(props) {
    super(props);
      let todos=JSON.parse(localStorage.getItem('todolist'));
      this.state = {
        todos : localStorage.getItem('todolist')? todos : [],
        todoToShow : 'all'
      };
  }

addTodo = (todo) => {

    if(localStorage.getItem('todolist')){
      let oldtodos=JSON.parse(localStorage.getItem('todolist'));
      if((oldtodos.filter(oldtodo => oldtodo.text === todo.text).length) === 1)
      {
        alert('Todo Already Present');
      }
    else{
      this.setState({
        todos : [todo, ...this.state.todos]
      });
      }
    }
    
    console.log(this.state.todos);
};

toggleComplete= (id)=> {
  this.setState({
    todos : this.state.todos.map(todo => {
      if(todo.id === id)
      {
        return{
          ...todo,
          complete : !todo.complete
        };
      }
      else {
        return todo;
      }
    })
  });
};

updateTodo = (filtervalue) => {
  this.setState({todoToShow : filtervalue});
};

deleteTodo = (id) => {
  this.setState({
    todos : this.state.todos.filter(todo => todo.id !== id)
  });
};

removecomplete = () => {
  this.setState({
    todos : this.state.todos.filter(todo => !todo.complete)
  })
};

  render() {
    let todos=[]
    if(this.state.todoToShow === 'all'){
      console.log(this.state.todoToShow);
      todos=this.state.todos;
    }else if(this.state.todoToShow === 'active'){
      console.log(this.state.todoToShow);
      todos=this.state.todos.filter(todo => !todo.complete);
    }else if(this.state.todoToShow === 'complete'){
      console.log(this.state.todoToShow);
      todos=this.state.todos.filter(todo => todo.complete);
    }
    localStorage.setItem('todolist',JSON.stringify(this.state.todos));
   
    
    return(
      <div className='App'>
        <TodoForm onSubmit = {this.addTodo} />
        <div  className = 'container'>
        {todos.map(todo => (
            <Todo 
            key = {todo.id}
            toggleComplete = {()=>this.toggleComplete(todo.id)} 
            todo = {todo}
            deleteTodo = {() => this.deleteTodo(todo.id)} 
            />
    ))}
        </div>
  

      {/* <div style = {{textAlign : 'center'}}>
        todos left : {this.state.todos.filter(todo => !todo.complete ).length}
      </div> */}
      <div>
        <button className = "normalButton -one" onClick = {() => this.updateTodo('all')} >All</button>
        <button className = "normalButton -two"  onClick={() => this.updateTodo('active')} >Active</button>
        <button className = "normalButton -three"  onClick={() => this.updateTodo('complete')} >Complete</button>
      </div>
      {this.state.todos.some(todo => todo.complete) ?  <div>
        <button className = "normalButton -four"  onClick={this.removecomplete}>Remove all complete todos</button>
      </div>  : null } 
    </div>   
    );
  }


}

ReactDOM.render(<APP />, document.getElementById('root'));