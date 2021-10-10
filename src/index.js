import React from 'react';
import ReactDOM from 'react-dom';
import "./styles/styles.scss";

import reportWebVitals from './reportWebVitals';
import AppRouter from './routers/AppRouter';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
