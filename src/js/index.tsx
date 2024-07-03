import '../scss/style.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';

import App from './app';
import store from './reducer/store';

const rootEl = document.querySelector('#root');

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);

  root.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
  );
}
