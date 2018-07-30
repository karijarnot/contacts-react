import {combineReducers} from 'redux';

//contactEntities and selectedContact are aliases for the default exports from the reducers and will be used
//to access state throughout the application
import contactEntities from './contactEntitiesReducer';
import selectedContact from './selectedContactReducer';


const rootReducer = combineReducers({
  //shorthand property name
  contactEntities,
  selectedContact
});

export default rootReducer;