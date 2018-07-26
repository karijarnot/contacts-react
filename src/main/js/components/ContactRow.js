import React from 'react';

import UpdateContactForm from './UpdateContactForm';

class ContactRow extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.handleDelete = this.handleDelete.bind(this);
	}
	
	handleDelete() {
		this.props.onDelete(this.props.contact);
	}

	render() {
		
		var modalId = 'updateModal'+ this.props.contact.id;
			
		return(
			<tr>
				<td>{this.props.contact.firstName}</td>
				<td>{this.props.contact.lastName}</td>
				<td>{this.props.contact.phoneNumber}</td>
				<td>{this.props.contact.email}</td>
				<td>
					<button className="btn btn-primary btn-sm" data-toggle="modal" data-target={'#' + modalId}>Update</button>
					<UpdateContactForm selectedContact={this.props.contact} modalId={modalId} onUpdate={this.props.onUpdate}/>
				</td>
				<td>
					<button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

export default ContactRow;