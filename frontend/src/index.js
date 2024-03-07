import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // Import Prov
// import { Provider } from 'react-redux';
import store from './Component/store';
import reducer from './Component/reducer'; // Import your reducer

import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> {/* Wrap your App component with Provider */}
    <App />
  </Provider>,
   
);
