import { combineReducers } from 'redux';

// reducer.js
const initialState = {
    data: null, // You can set an initial value for the 'data' field, or leave it as null
    // Other fields in your state can be added here
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_DATA':
        return {
          ...state,
          data: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  
