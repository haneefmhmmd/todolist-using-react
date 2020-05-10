import React from 'react';
import shortid from 'shortid';
export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          text : ""
        };
    }
    handleChange = (e) => {
        this.setState({text:e.target.value})
    };
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.text){
            this.props.onSubmit({
                id : shortid.generate(),
                text : this.state.text,
                complete : false
            });
    
        }
        else{
            alert('Invalid Input');
        } 
        this.setState({text : ''})
    };
    render() {
        return(
            <form >
            <input
                className="todoform-input"
                value={this.state.text} 
                onChange={this.handleChange}
                placeholder='todo...' 
            />
            <button className="addButton" onClick={this.handleSubmit} >Add todo</button> 

            </form>
                        
        );
    }


}