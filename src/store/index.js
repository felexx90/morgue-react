import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware } from 'redux-observable';
import rootEpic from '../epics';
import reducers from '../reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const persistConfig = {
  transforms: [
    immutableTransform({
      blacklist: ['search']
    })],
  key: 'root',
  storage
};

export default () => {
  let store = createStore(
    persistReducer(persistConfig, reducers),
    composeWithDevTools(applyMiddleware(epicMiddleware))
  );
  let persistor = persistStore(store);
  return { store, persistor };
}