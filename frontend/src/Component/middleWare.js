// Assuming you have middleware defined in a separate file, e.g., middleware.js
// middleware.js
const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      // If the action is a function (thunk), execute it with dispatch, getState, and extraArgument
      return action(dispatch, getState);
    }
    // If the action is not a function, pass it to the next middleware or the reducer
    return next(action);
  };
  
  export default middleware;
  