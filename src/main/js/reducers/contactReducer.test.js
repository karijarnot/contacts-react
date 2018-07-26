import expect from 'expect';
import deepFreeze from 'deep-freeze';
import contactReducer from './contactReducer';
import * as actions from '../actions/contactActions';

describe('Contact Reducer', () => {
	it('should add contact when passed ADD_CONTACT_SUCCESS', () => {
		
		const initialState = [
		      {firstName: 'A'},
		      {firstName: 'B'}
		    ];

		    const newContact = {firstName: 'C'};

		    const action = actions.addContactSuccess(newContact);
		    
		    //make sure that the reducer does not mutate state;
		    deepFreeze(action);
		    deepFreeze(initialState);

		    // act
		    const newState = contactReducer(initialState, action);
		    
		    

		    // assert
		    expect(newState.length).toEqual(3);
		    expect(newState[0].firstName).toEqual('A');
		    expect(newState[1].firstName).toEqual('B');
		    expect(newState[2].firstName).toEqual('C');
		
		
	});
});