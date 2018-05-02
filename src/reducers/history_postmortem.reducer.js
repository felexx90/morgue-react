import { List, Map } from 'immutable';

export const types = {
  ADD_HISTORY_POSTMORTEM: 'ADD_HISTORY__POSTMORTEM',
  REMOVE_HISTORY_POSTMORTEM: 'REMOVE_HISTORY_POSTMORTEM',
};

export const INITIAL_STATE = Map({});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_HISTORY_POSTMORTEM:
      return state.update(payload.postmortem, (history = List([])) => history.push(payload.history));
    case types.REMOVE_HISTORY_POSTMORTEM:
      return state.delete(payload.postmortem);
    default:
      return state;
  }
}
