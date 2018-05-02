import { merge } from 'rxjs/observable/merge';
import { historyCreateEpic, historyEditEpic, historyDeleteEpic } from './history.epic';

const rootEpic = (action$, store) => merge(
  historyCreateEpic(action$, store),
  historyEditEpic(action$, store),
  historyDeleteEpic(action$, store)
);

export default rootEpic;