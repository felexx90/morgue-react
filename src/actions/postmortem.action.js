import { Map } from 'immutable';
import { types } from '../reducers/postmortem.reducer';

export const addPostmortem = (postmortem) => {
  return { type: types.ADD_POSTMORTEM, payload: { postmortem: Map(postmortem) } };
};

export const removePostmortem = (postmortem) => {
  return { type: types.REMOVE_POSTMORTEM, payload: { postmortem } };
};

export const editPostmortem = (postmortem) => {
  return { type: types.EDIT_POSTMORTEM, payload: { postmortem } };
};

export const searchPostmortem = (search) => {
  return { type: types.SEARCH_POSTMORTEM, payload: { search } };
};
