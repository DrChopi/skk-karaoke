import React from 'react';
import ReactDOM from 'react-dom';

import Router from './pages/Router';
import * as serviceWorker from './modules/serviceWorker';

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);

serviceWorker.register();
