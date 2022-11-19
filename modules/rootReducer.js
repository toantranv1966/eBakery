import { combineReducers } from 'redux';

// import shoppingReducer from './modules/reducers';
import shoppingReducer from './reducers';

// COMBINE MANY REDUCERS
const rootReducer = combineReducers({
  shoppingReducer,
});

export default rootReducer;
