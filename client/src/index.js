import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
module.hot.accept();

// import App from './components/App'

// ReactDOM.render(
//   <App/>,
//   document.getElementById('app')
// );
// module.hot.accept();
