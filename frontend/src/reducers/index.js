import {combineReducers} from 'redux';
import tasks from './tasks'
import columns from './columns'
import auth from './auth'

export default combineReducers({
  tasks,
  columns,
  auth
});
