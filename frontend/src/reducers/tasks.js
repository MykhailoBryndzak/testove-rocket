import uuid from 'uuid/v4';

const initialState = {
  kanbanTasks: [
    {id: uuid(), title: "First Task", status: 1},
    {id: uuid(), title: "Second Task", status: 1},
    {id: uuid(), title: "Third Task", status: 1},
    {id: uuid(), title: "Fourth Task", status: 2},
    {id: uuid(), title: "Fifth Task", status: 2},
    {id: uuid(), title: "Sixth Task", status: 3},
    {id: uuid(), title: "Seventh Task", status: 4},
    {id: uuid(), title: "Eighth Task", status: 4},
    {id: uuid(), title: "Ninth Task", status: 5},
    {id: uuid(), title: "Tenth Task", status: 5}
  ],
};

const tasks = (
  state = initialState,
  action
) => {
  const {kanbanTasks} = state;

  switch (action.type) {
    case 'NEW_TASK':
      return {
        ...state,
        kanbanTasks: kanbanTasks.concat({id: uuid(), title: action.data.taskTitle, status: action.data.columnId})
      };
    case 'DELETE_TASK':
      return {
        ...state,
        kanbanTasks: kanbanTasks.filter(task => task.id !== action.data)
      };
    case 'CHANGE_TASK_COLUMN':
      const {taskId, columnId} = action.data;
      const updatedTasks = kanbanTasks.map(task => {
        if (task.id === taskId) {
          task.status = columnId
        }
        return task;
      });
      return {
        ...state,
        kanbanTasks: updatedTasks
      };
    default:
      return state;
  }
};

export default tasks;
