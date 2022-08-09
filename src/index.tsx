import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

function initApp() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  reportWebVitals();
}

function prepare() {
  if (
    process.env.NODE_ENV === 'development' &&
    process.env.REACT_APP_USE_MOCK_SERVER === 'yes'
  ) {
    const { worker } = require('./__tests__/server/browser');
    return worker.start();
  }
  return Promise.resolve();
}

prepare()
  .then(() => {
    initApp();
  })
  .catch((err: unknown) => {
    console.error('Error starting worker', err);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
