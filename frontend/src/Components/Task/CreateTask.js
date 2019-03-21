import React, {Component} from 'react';
import {connect} from "react-redux";
import {changeTaskColumn, newTask} from "../../actions/tasks";
import styled from "styled-components";

const InputCreateTask = styled.input`
  padding: 10px;
  margin: 10px;
  fontSize: 0.8em;
`;
const ButtonCreateTask = styled.button`
  padding: 3px, 5px, 5px ,5px;
  margin-top: 3px;
  background-color: cadetblue;
  color: white;
  border: solid thin cadetblue;
  border-radius: 3px;
  font-size: 1.3em;
  cursor: pointer;
`;

class CreateTask extends Component {
  state = {
    taskTitle: ''
  };

  newTask = () => {
    if (this.state.taskTitle !== '') {
      this.props.newTask({taskTitle: this.state.taskTitle, columnId: this.props.columnId});
      this.setState({taskTitle: ''})
    }
  };

  render() {
    const handleChangeTaskTitle = (event) => {
      this.setState({taskTitle: event.target.value})
    };

    return (
      <div>
        <InputCreateTask
          placeholder={'Add new task...'}
          type="text"
          value={this.state.taskTitle}
          onChange={handleChangeTaskTitle}
        />
        <ButtonCreateTask
          onClick={this.newTask}
        >
          +
        </ButtonCreateTask>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newTask: (data) => dispatch(newTask(data)),
    changeTaskColumn
  };
}

export default connect(null, mapDispatchToProps)(CreateTask);
