import {combineReducers} from 'redux';

//contactEntities is an alias for the default export from contactReducer and will be used
//to access state throughout the application
import contactEntities from './contactReducer';


//using combineReducers here even though there is only currently one reducer
//any app of some complexity (more complex than this) will want to have multiple reducers
const rootReducer = combineReducers({
  //shorthand property name
  contactEntities
});

export default rootReducer;