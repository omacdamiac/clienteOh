import React, { Component } from "react";
import Task from "./Task";
import PropTypes from "prop-types";

class Tasks extends Component {
    render() {
        return this.props.mock.map(e => 
        <Task e={e} key={e.id} deleteTask={this.props.deleteTask} checkDone={this.props.checkDone} />)
    }
}

Tasks.propTypes = {
    mock: PropTypes.array.isRequired
}

export default Tasks;