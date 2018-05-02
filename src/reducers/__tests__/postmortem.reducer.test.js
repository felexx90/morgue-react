import { Map } from 'immutable';
import * as matchers from 'jest-immutable-matchers';
import postmortemReducer, { INITIAL_STATE } from '../postmortem.reducer';
import { addPostmortem, editPostmortem, removePostmortem } from '../../actions/postmortem.action';

describe('reducer/history_postmortem', () => {
  beforeEach(function() {
    jest.addMatchers(matchers);
  });

  it('should have initial state', () => {
    expect(postmortemReducer(undefined, { type: 'INIT' })).toEqualImmutable(INITIAL_STATE);
  });

  it('should not affect state', () => {
    const newState = postmortemReducer(INITIAL_STATE, { type: 'NOT_EXISTING' });
    expect(newState).toEqualImmutable(INITIAL_STATE);
  });

  it('should add new Postmortem', () => {
    const postmortem = {
      id: 1, title: 'Test', startDate: null, endDate: null, detectedDate: null, severity: '1', whyhappened: '#2', summary: '#2',
      tags: ['prueba']
    };

    const expectedState = INITIAL_STATE.set('postmortems', Map({}).set(1, Map(postmortem)));
    const newState = postmortemReducer(INITIAL_STATE, addPostmortem(postmortem));
    expect(newState).toEqualImmutable(expectedState);
  });

  it('should remove Postmortem', () => {
    const postmortem = {
      id: 1, title: 'Test', startDate: null, endDate: null, detectedDate: null, severity: '1', whyhappened: '#2', summary: '#2',
      tags: ['prueba']
    };
    const initialState = INITIAL_STATE.set('postmortems', Map({}).set(1, Map(postmortem)));
    const expectedState = INITIAL_STATE;

    const newState = postmortemReducer(initialState, removePostmortem(Map(postmortem)));
    expect(newState).toEqualImmutable(expectedState);
  });

  it('should edit Postmortem', () => {
    const initalPostmortem = {
      id: 1, title: 'Test Create', startDate: null, endDate: null, detectedDate: null, severity: '1', whyhappened: '#2', summary: '#2',
      tags: ['prueba']
    };
    const editedPostmortem = {
      id: 1, title: 'Test Edit', startDate: null, endDate: null, detectedDate: null, severity: '1', whyhappened: '#2', summary: '#2',
      tags: ['prueba']
    };
    const initialState = INITIAL_STATE.set('postmortems', Map({}).set(1, Map(initalPostmortem)));
    const expectedState = INITIAL_STATE.set('postmortems', Map({}).set(1, Map(editedPostmortem)));

    const newState = postmortemReducer(initialState, editPostmortem(editedPostmortem));
    expect(newState).toEqualImmutable(expectedState);
  });
});