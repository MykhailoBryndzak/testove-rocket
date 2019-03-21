import DraggableTask from "./DraggableTask";
import React, {Component} from "react";
import {changeTaskColumn, deleteTask} from "../../actions/tasks";
import {connect} from "react-redux";
import styled from 'styled-components';

const Task = styled.div`
  padding: 10px;
  margin: 10px 0 10px 10px;
  font-size: 0.8em;
  cursor: pointer;
  background-color: white;
`;
const DeleteTaskButton = styled.button`
  margin-top: 9px;
  height: 35px; 
  cursor: pointer;
  background: tomato;
`;

class TaskItem extends Component {

  handleOnDropTask = (taskId, columnId) => {
    this.props.changeTaskColumn({taskId, columnId})
  };

  handleOnDeleteTask = (taskId) => {
    this.props.deleteTask(taskId)
  };

  render() {
    const {id, title} = this.props;
    return (
      <div style={{display: 'flex'}}>
        <DraggableTask id={id} onDrop={this.handleOnDropTask}>
          <Task>{title}</Task>
        </DraggableTask>
        <DeleteTaskButton
          onClick={this.handleOnDeleteTask.bind(this, id)}
        >
          X
        </DeleteTaskButton>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTaskColumn: (data) => dispatch(changeTaskColumn(data)),
    deleteTask: (data) => dispatch(deleteTask(data)),
  };
}

export default connect(null, mapDispatchToProps)(TaskItem);
