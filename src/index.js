import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import history from 'utils/history';
import store from 'store';

import RouterComponent from 'components/Router';


import './index.scss';

ReactDOM.render(
  (
      <Router history={history}>
        <Provider store={store}>
          <RouterComponent />
        </Provider>
      </Router>
  ),
  document.getElementById('root')
);
