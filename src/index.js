import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import configureStore from './site/store';
import createRoutes from './site/routes';
import registerServiceWorker from './lib/registerServiceWorker';
import { initLocale } from './lib/i18n';

function syncHistory(history, store) {
  return syncHistoryWithStore(history, store, {
    selectLocationState: (state) => {
      return state.get('core').get('router').toJS();
    }
  });
}

let store = configureStore(browserHistory, Immutable.Map());
let history = syncHistory(browserHistory, store);
let routes = createRoutes(store);

initLocale();

ReactDOM.render(
  <div>
    <LocaleProvider locale={enUS}>
      <Provider store={store}>
        <Router history={history} routes={routes}/>
      </Provider>
    </LocaleProvider>
  </div>,
  document.getElementById('root')
);

registerServiceWorker();
