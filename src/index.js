// // src/index.js
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import store from './app/store';
// import App from './App';

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );

// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import for React 18
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot method instead of render

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
