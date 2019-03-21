import React from 'react';
import {DragSource} from "react-dnd";

const boxSource = {
  beginDrag(props) {
    return {
      name: props.id
    };
  },

  endDrag(props, monitor) {
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onDrop(monitor.getItem().name, dropResult.name);
    }
  }
};

class DraggableTask extends React.Component {
  render() {
    return this.props.connectDragSource(<div style={{width: '90%'}}>{this.props.children}</div>);
  }
}

export default DraggableTask = DragSource("kanbanItem", boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(DraggableTask);
