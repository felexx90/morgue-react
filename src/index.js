import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-datetime/css/react-datetime.css';
import 'codemirror/lib/codemirror.css';
import './index.css';

import configurationStore from './store';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const { store, persistor } = configurationStore();

const app = (
  <Provider store={store} >
    <PersistGate persistor={persistor} >
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <App />
      </BrowserRouter >
    </PersistGate >
  </Provider >
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
