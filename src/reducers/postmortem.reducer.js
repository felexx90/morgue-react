import { Map } from 'immutable';

export const types = {
  ADD_POSTMORTEM: 'ADD_POSTMORTEM',
  REMOVE_POSTMORTEM: 'REMOVE_POSTMORTEM',
  EDIT_POSTMORTEM: 'EDIT_POSTMORTEM',
  SEARCH_POSTMORTEM: 'SEARCH_POSTMORTEM'
};

export const INITIAL_STATE = Map({
  postmortems: Map({}),
  filterTags: null,
  search: null
});

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.ADD_POSTMORTEM:
      return state.update('postmortems', postmortems => postmortems.set(payload.postmortem.get('id'), payload.postmortem));
    case types.REMOVE_POSTMORTEM:
      console.log(payload.postmortem.get('id'));
      return state.update('postmortems', postmortems => postmortems.delete(payload.postmortem.get('id')));
    case types.EDIT_POSTMORTEM:
      return state.update('postmortems',
        postmortems => postmortems.set(payload.postmortem.id, Map(payload.postmortem)));
    case types.SEARCH_POSTMORTEM:
      return state.set('search', payload.search);
    default:
      return state;
  }
}
