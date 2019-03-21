import uuid from 'uuid/v4';

const initialState = {
  kanbanColumns: [
    {id: 1, title: "Backlog"},
    {id: 2, title: "To Do"},
    {id: 3, title: "In Progress"},
    {id: 4, title: "Review"},
    {id: 5, title: "Done"}
  ]
};

const columns = (
  state = initialState,
  action
) => {
  const {kanbanColumns} = state;
  switch (action.type) {
    case 'NEW_COLUMN':
      return {
        ...state,
        kanbanColumns: kanbanColumns.concat({id: uuid(), title: action.data})
      };
    case 'DELETE_COLUMN':
      return {
        ...state,
        kanbanColumns: kanbanColumns.filter(column => column.id !== action.data)
      };
    case 'EDIT_COLUMN':
      const updatedColumns = kanbanColumns.map(column => {
        if (column.id === action.data.columnId) {
          column.title = action.data.columnTitle
        }
        return column;
      });
      return {
        ...state,
        kanbanColumns: updatedColumns
      };
    default:
      return state;
  }
};

export default columns;
