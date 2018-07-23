import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function contactReducer(state = initialState.contactEntities, action) {
	switch(action.type) {
		case types.LIST_CONTACTS_SUCCESS:
			return action.contactEntities;
		case types.DELETE_CONTACT_SUCCESS:
			//this is using the spread operator to make a new list with the entity with the deleted id filtered from the list. 
			//Perhaps should call the service for a new list in case other users have made a change, not here, of course, in the thunk
			return [...state.filter(contactEntity => contactEntity.id !== action.contactEntity.id)];
		case types.ADD_CONTACT_SUCCESS:
			return [
		        ...state,
		        Object.assign({}, action.contactEntity)
		      ];
		
		case types.UPDATE_CONTACT_SUCCESS: 
			return [
		          //this filter is making a new array out of the members of the original array
		          //that do not have the id of the contact that has been updated
		          //then the updated contact is added to the array
		          ...state.filter(contactEntity => contactEntity.id !== action.contactEntity.id),
		          Object.assign({}, action.contactEntity)
		        ]; 
		case types.SEARCH_CONTACTS_SUCCESS:
			return action.contactEntities;
		default:
			return state;
	}
}