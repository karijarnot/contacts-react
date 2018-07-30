import * as types from '../actions/actionTypes';
import initialState from './initialState';

const selectedContactReducer = (state = initialState.selectedContact, action) => {
	switch(action.type) {
		case types.SELECT_CONTACT_FOR_UPDATE_SUCCESS:
			return action.contactEntity;
		default:
			return state;
	}
}

export default selectedContactReducer;