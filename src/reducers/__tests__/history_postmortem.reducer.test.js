import { List, Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import historyReducer, { INITIAL_STATE, types } from '../history_postmortem.reducer';
import moment from 'moment';

describe('reducer/history_postmortem', () => {
  beforeEach(function() {
    jest.addMatchers(matchers);
  });

  it('should have initial state', () => {
    expect(historyReducer(undefined, { type: 'INIT' })).toEqualImmutable(INITIAL_STATE);
  });

  it('should not affect state', () => {

    const newState = historyReducer(INITIAL_STATE, { type: 'NOT_EXISTING' });
    expect(newState).toEqualImmutable(INITIAL_STATE);
  });

  it('should add new History Postmortem', () => {
    const date = moment();
    const history = { action: 'Created', user: 'morgue_user', date };
    const expectedState = Map({}).set(1, List([history]));

    const newState = historyReducer(INITIAL_STATE, { type: types.ADD_HISTORY_POSTMORTEM, payload: { postmortem: 1, history } });
    expect(newState).toEqualImmutable(expectedState);
  });

  it('should remove History Postmortem', () => {
    const history = { action: 'Edited', user: 'morgue_user', date: moment() };
    const initialState = Map({}).set(1, List([history]));
    const expectedState = Map({});

    const newState = historyReducer(initialState, { type: types.REMOVE_HISTORY_POSTMORTEM, payload: { postmortem: 1 } });
    expect(newState).toEqualImmutable(expectedState);
  });
});