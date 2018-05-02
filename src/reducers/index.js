import { combineReducers } from 'redux';
import postmortems from './postmortem.reducer';
import historyPostmortem from './history_postmortem.reducer';

export default combineReducers({
    postmortems,
    historyPostmortem
  }
);