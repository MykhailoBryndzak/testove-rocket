export const changeTaskColumn = (data) => {
  return {
    type: 'CHANGE_TASK_COLUMN',
    data
  }
};

export const newTask = (data) => {
  return {
    type: 'NEW_TASK',
    data
  }
};

export const deleteTask = (data) => {
  return {
    type: 'DELETE_TASK',
    data
  }
};
