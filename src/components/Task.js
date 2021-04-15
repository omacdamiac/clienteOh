import React, { Component } from "react";
import "./Task.css";

class Task extends Component {

    styleComplete() {
        return {
            fontSize: '18px',
            background: '#ccc',
            color: this.props.e.done ? 'red' : 'black',
            textDecoration: this.props.e.done ? 'line-through' : 'none',
        }
    }

    render() {
        const {e} = this.props;

        return <div style={this.styleComplete()}>
                {e.nombre} - {e.apellido}
                <input type="checkbox" onChange={this.props.checkDone.bind(this, e.id)} />
                <button style={btnDelete} onClick={this.props.deleteTask.bind(this, e.id)}>x</button>
        </div>
    }
}

const btnDelete = {
    fontSize: '18px',
    background: 'red',
    color: 'white',
    padding: '10px 15px',
    border: '0',
    cursor: 'pointer',
    borderRadius: '50%'
}

export default Task;