import React, {Component} from "react";
import {deleteColumn, editColumn} from "../../actions/coulums";
import {connect} from "react-redux";
import styled from "styled-components";

const ColumnHead = styled.div`
    width: 100%;
    text-align: center;
    padding: 10px;
    font-size: 1.2em;
    background-color: #C6D8AF;
`;

class ColumnHeader extends Component {
  state = {
    isEditingColumnTitle: false,
    editingColumnId: '',
  };

  handleOnDeleteColumn = (columnId) => {
    this.props.deleteColumn(columnId)
  };

  handleOnEditColumn = (columnId) => {
    this.setState((prevState) => ({
      isEditingColumnTitle: !prevState.isEditingColumnTitle,
      editingColumnId: columnId,
    }))
  };

  handleOnConfirmEditingColumn = (columnId) => {
    if(this.state.columnTitle) this.props.editColumn({columnId, columnTitle: this.state.columnTitle});
    this.setState((prevState) => ({
      isEditingColumnTitle: !prevState.isEditingColumnTitle,
      columnTitle: ''
    }));
  };

  handleChangeColumnTitle = (event) => {
    this.setState({columnTitle: event.target.value})
  };
  render() {
    const {id, title} = this.props;
    return (
      <div style={{display: 'flex'}}>
        {this.state.isEditingColumnTitle && id === this.state.editingColumnId ? (
          <input
            style={{
              width: '100%',
              padding: 10,
              fontSize: "0.8em",
            }}
            placeholder={'Edit column title...'}
            type="text"
            value={this.state.columnTitle}
            onChange={this.handleChangeColumnTitle}
          />
        ) : (
          <ColumnHead>{title}</ColumnHead>
        )}
        {this.state.isEditingColumnTitle && id === this.state.editingColumnId ? (
          <button
            style={{height: 44, cursor: 'pointer', background: '#0ba1e18c'}}
            onClick={this.handleOnConfirmEditingColumn.bind(this, id)}
          >
            Save
          </button>
        ) : (
          <button
            style={{height: 44, cursor: 'pointer', background: '#3d7e9a8c'}}
            onClick={this.handleOnEditColumn.bind(this, id)}
          >
            Edit
          </button>
        )}
        <button
          style={{height: 44, cursor: 'pointer', background: '#ff634775', marginRight: 7}}
          onClick={this.handleOnDeleteColumn.bind(this, id)}
        >
          X
        </button>

      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteColumn: (data) => dispatch(deleteColumn(data)),
    editColumn: (data) => dispatch(editColumn(data)),
  };
}

export default connect(null, mapDispatchToProps)(ColumnHeader);

