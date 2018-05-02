import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import { types } from '../reducers/postmortem.reducer';
import { addHistoryPostmortem, removeHistoryPostmortem } from '../actions/history_postmortem.action';
import moment from 'moment';

export const historyCreateEpic = action$ =>
  action$.pipe(
    ofType(types.ADD_POSTMORTEM),
    map(({ payload }) => addHistoryPostmortem(
      payload.postmortem.get('id'),
      {
        action: 'Created',
        user: 'morgue_user',
        date: moment()
      }
      )
    )
  );

export const historyEditEpic = action$ =>
  action$.pipe(
    ofType(types.EDIT_POSTMORTEM),
    map(({ payload }) => addHistoryPostmortem(
      payload.postmortem.id,
      {
        action: 'Edited',
        user: 'morgue_user',
        date: moment()
      }
      )
    )
  );

export const historyDeleteEpic = action$ =>
  action$.pipe(
    ofType(types.REMOVE_POSTMORTEM),
    map(({ payload }) => removeHistoryPostmortem(
      payload.postmortem.id
      )
    )
  );
