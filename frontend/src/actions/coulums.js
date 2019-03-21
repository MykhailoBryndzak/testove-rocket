export const newColumn = (data) => {
  return {
    type: 'NEW_COLUMN',
    data
  }
};


export const deleteColumn = (data) => {
  return {
    type: 'DELETE_COLUMN',
    data
  }
};

export const editColumn = (data) => {
  return {
    type: 'EDIT_COLUMN',
    data
  }
};


