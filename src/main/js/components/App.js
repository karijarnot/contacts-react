'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../actions/contactActions';

import ContactList from './ContactList';
import AddContactForm from './AddContactForm';
import SearchContactForm from './SearchContactForm';

import toastr from 'toastr';


class App extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onClearSearch = this.onClearSearch.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		
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
	
	componentDidMount() {
		this.props.actions.listContacts();
	}
	
  render() {
    return (
    	<div>
    		<div>
				<h1>Contacts</h1>
			</div>
    		<ContactList contactEntities={this.props.contactEntities} onDelete={this.onDelete} onClearSearch={this.onClearSearch} onUpdate={this.onUpdate}  />
    		<AddContactForm onCreate={this.onCreate} />		
    		<SearchContactForm onSearch={this.onSearch} />
    	</div>
    );
  }
}

function mapStateToProps(state, ownProps) {
	return { contactEntities: state.contactEntities };
}

function mapDispatchToProps(dispatch) {
	return { actions: bindActionCreators(contactActions, dispatch) };
}

	
export default connect(mapStateToProps, mapDispatchToProps)(App);	
