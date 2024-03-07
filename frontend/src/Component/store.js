// store.js
import {createStore, applyMiddleware }from 'redux';
import rootReducer from './reducer';
 import {thunk} from 'redux-thunk';
 import customMiddleware from './middleWare';


const store = createStore(
    rootReducer,
    applyMiddleware(thunk, customMiddleware)// You can add more middleware here if needed
  );

export default store;
