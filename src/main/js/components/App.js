'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../actions/contactActions';

import ContactListTable from './ContactListTable';
import SearchContactForm from './SearchContactForm';
import ContactForm from './ContactForm';

import toastr from 'toastr';


class App extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onClearSearch = this.onClearSearch.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		this.onSelectForUpdate = this.onSelectForUpdate.bind(this);
		
	}
	
	onDelete(contact) {
		this.props.actions.deleteContact(contact);
		toastr.success('Contact deleted');
	}
	
	onUpdate(contact, id) {
		contact.id = id;
		this.props.actions.updateContact(contact);
		toastr.success('Contact updated');
	}
	
	
	onCreate(contact) {
		this.props.actions.addContact(contact);
		toastr.success('Contact added');
	}
	
	onSearch(contact) {
		this.props.actions.searchContacts(contact);
	}
	
	onClearSearch() {
		this.props.actions.listContacts();
	}
	
	onSelectForUpdate(contact) {
		this.props.actions.selectContactForUpdateSuccess(contact);
	}
	
	componentDidMount() {
		this.props.actions.listContacts();
	}
	
  render() {
	  
   
	  
    return (
    	<div>
    		<div>
				<h1>Contacts</h1>
			</div>
			<ContactListTable contactEntities={this.props.contactEntities} onDelete={this.onDelete} onSelectForUpdate={this.onSelectForUpdate} />
    		<br/>
			
			
			<div className="text-center">
				<button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#addModal">Add Contact</button>
				<button type="button" className="btn btn-primary m-1" data-toggle="modal" data-target="#searchModal">Search Contacts</button>
				<button type="button" className="btn btn-primary m-1" onClick={this.onClearSearch}>Display All Contacts</button>
			</div>
    		<ContactForm selectedContact={{}} onSubmit={this.onCreate} modalId="addModal" />		
    		<SearchContactForm onSearch={this.onSearch} />
    		<ContactForm selectedContact={this.props.selectedContact} onSubmit={this.onUpdate} modalId="updateModal" />
    	</div>
    );
  }
}

//This is where we tell react-redux what slice of the state in the store we need for this container component.
//In this case, contactEntities and selectedContact
function mapStateToProps(state, ownProps) {
	return { contactEntities: state.contactEntities,
		selectedContact: state.selectedContact
	};
}

//This is where we tell react-redux what actions we'd like to have access to for this container component.
function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(contactActions, dispatch) };
}

//the connect function call makes the state and dispatch available via props to our component
export default connect(mapStateToProps, mapDispatchToProps)(App);	
