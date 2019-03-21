import React from "react";
import {DropTarget} from "react-dnd";

const boxTarget = {
  drop(props) {
    return { name: props.columnId };
  }
};

class DroppableColumn extends React.Component {
  render() {
    return this.props.connectDropTarget(<div>{this.props.children}</div>);
  }
}

export default DroppableColumn = DropTarget("kanbanItem", boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(DroppableColumn);
