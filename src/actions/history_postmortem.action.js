import { Map } from 'immutable';
import { types } from '../reducers/history_postmortem.reducer';

export const addHistoryPostmortem = (postmortem, history) => {
  return { type: types.ADD_HISTORY_POSTMORTEM, payload: { postmortem, history: Map(history) } };
};

export const removeHistoryPostmortem = (postmortem) => {
  return { type: types.REMOVE_HISTORY_POSTMORTEM, payload: { postmortem } };
};