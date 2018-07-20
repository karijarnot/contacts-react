'use strict';

import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as contactActions from '../actions/contactActions';

import ContactList from './ContactList';
import AddContactForm from './AddContactForm';
import SearchContactForm from './SearchContactForm';

const React = require('react');
const ReactDOM = require('react-dom')


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
	}
	
	onUpdate(contact, id) {
		contact.id = id;
		this.props.actions.updateContact(contact);
	}
	
	
	onCreate(contact) {
		this.props.actions.createContact(contact);
	}
	
	onSearch(contact) {
		this.props.actions.searchContacts(contact);
	}
	
	onClearSearch() {
		this.props.actions.loadContacts();
	}
	
	componentDidMount() {
		this.props.actions.loadContacts();
	}
	
  render() {
    return (
    	<div>
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
