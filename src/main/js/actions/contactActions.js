import * as types from './actionTypes';
import axios from 'axios';


export function loadContactsSuccess(contactEntities) {
	return {type: types.LOAD_CONTACTS_SUCCESS, contactEntities};
}

export function createContactSuccess(contactEntities) {
	return {type: types.CREATE_CONTACT_SUCCESS, contactEntities};
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



//these are the thunks. Anything that needs to call an api should be a thunk. The action creators
//above should be pure functions.

export function loadContacts() {
	return function(dispatch) {
		return axios.get('/contacts-rest/').then(response => {
			const contactEntities = response.data;
			dispatch(loadContactsSuccess(contactEntities));
		}).catch(error => {
			throw(error);
		});
	};
}

export function createContact(contactEntity) {
	
	return function(dispatch) {
		return axios.post('/contacts-rest/add', contactEntity).then(response =>{
			axios.get('/contacts-rest/').then(response => {
				const contactEntities = response.data;
				dispatch(loadContactsSuccess(contactEntities));
			}).catch(error => {
				throw(error);
			});
		}).catch(error => {
			throw(error);
		});
	};
}

export function updateContact(contactEntity) {
	return function(dispatch) {
		return axios.put('/contacts-rest/update', contactEntity).then(response =>{
			console.log(response);
			dispatch(updateContactSuccess(contactEntity));
		}).catch(error => {
			throw(error);
		});
	};
}

export function deleteContact(contactEntity) {
	
	return function(dispatch) {
		return axios.delete('/contacts-rest/' + contactEntity.id).then(res => {
			console.log(res);
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