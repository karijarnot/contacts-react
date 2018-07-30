import * as types from './actionTypes';
import axios from 'axios';


export function listContactsSuccess(contactEntities) {
	return {type: types.LIST_CONTACTS_SUCCESS, contactEntities};
}

export function addContactSuccess(contactEntity) {
	return {type: types.ADD_CONTACT_SUCCESS, contactEntity};
}

export function updateContactSuccess(contactEntity) {
	return {type: types.UPDATE_CONTACT_SUCCESS, contactEntity};
}

export function deleteContactSuccess(contactEntity) {
	return {type: types.DELETE_CONTACT_SUCCESS, contactEntity};
}

export function searchContactsSuccess(contactEntities) {
	return {type: types.SEARCH_CONTACTS_SUCCESS, contactEntities};
}

export function selectContactForUpdateSuccess(contactEntity) {
	return {type: types.SELECT_CONTACT_FOR_UPDATE_SUCCESS, contactEntity};
}




//these are the thunks. Anything that needs to call an api should be a thunk. The action creators
//above should be pure functions.

export function listContacts() {
	return function(dispatch) {
		return axios.get('/contacts-rest/').then(response => {
			const contactEntities = response.data;
			dispatch(listContactsSuccess(contactEntities));
		}).catch(error => {
			throw(error);
		});
	};
}

export function addContact(contactEntity) {
	return function(dispatch) {
		return axios.post('/contacts-rest/add', contactEntity).then(response =>{
			const contactEntityWithId = response.data;
			dispatch(addContactSuccess(contactEntityWithId));
			
		}).catch(error => {
			throw(error);
		});
	};
}

export function updateContact(contactEntity) {
	return function(dispatch) {
		return axios.put('/contacts-rest/update', contactEntity).then(response =>{
			dispatch(updateContactSuccess(contactEntity));
		}).catch(error => {
			throw(error);
		});
	};
}

export function deleteContact(contactEntity) {
	return function(dispatch) {
		return axios.delete('/contacts-rest/' + contactEntity.id).then(res => {
			dispatch(deleteContactSuccess(contactEntity));
		}).catch(error => {
			throw(error);
		});
	};
}

export function searchContacts(contactEntity) {
		
	return function(dispatch) {
		return axios.post('/contacts-rest/search', contactEntity).then(res => {
			const contactEntities = res.data;
			dispatch(searchContactsSuccess(contactEntities));
		}).catch(error => {
			throw(error);
		});
	};
}