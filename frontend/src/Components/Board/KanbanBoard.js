import React from "react";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import DroppableColumn from "../Column/DroppableColumn";
import {connect} from "react-redux";
import {changeTaskColumn, deleteTask} from "../../actions/tasks";
import CreateTask from "../Task/CreateTask";
import CreateColumn from "../Column/CreateColumn";
import {deleteColumn, editColumn} from "../../actions/coulums";
import ColumnHeader from "../Column/ColumnHeader";
import TaskItem from "../Task/TaskItem";
import styled from 'styled-components';

const Column = styled.div`
    minWidth: 200;
    width: 18vw;
    height: 80vh;
    margin: 0 auto;
    background-color: #FCC8B2;
`;

const Board = styled.section`
    display: flex;
    margin: 0 auto;
    width: 90vw;
    font-family: Arial, Helvetica Neue, sans-serif;
`;

const VerticalLine = styled.hr`
    color: black;
    margin: 0;
`;

class KanbanBoard extends React.Component {
  render() {
    const {tasks, columns} = this.props;
    return (
      <main>
        <CreateColumn/>
        <Board>
          {columns.map((column) => (
            <div key={column.id}>
              <DroppableColumn columnId={column.id}>
                <Column>
                  <ColumnHeader id={column.id} title={column.title}/>
                  {tasks
                    .filter(task => task.status === column.id)
                    .map(task => (
                      <TaskItem key={task.id} id={task.id} title={task.title}/>
                    ))}
                  <CreateTask columnId={column.id}/>
                </Column>
              </DroppableColumn>

              <VerticalLine/>
            </div>
          ))}
        </Board>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks.kanbanTasks,
    columns: state.columns.kanbanColumns
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeTaskColumn: (data) => dispatch(changeTaskColumn(data)),
    deleteTask: (data) => dispatch(deleteTask(data)),
    deleteColumn: (data) => dispatch(deleteColumn(data)),
    editColumn: (data) => dispatch(editColumn(data)),
  };
}


KanbanBoard = DragDropContext(HTML5Backend)(KanbanBoard);
export default connect(mapStateToProps, mapDispatchToProps)(KanbanBoard);

