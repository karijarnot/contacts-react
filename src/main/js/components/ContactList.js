import React from 'react';
import ContactRow from './ContactRow';

class ContactList extends React.Component {
	constructor(props){
		super(props);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}
	
	handleClearSearch() {
		this.props.onClearSearch();
	}
	
	render() {
		
		var contactEntities = this.props.contactEntities.map(contact =>
			<ContactRow key={contact.id} contact={contact} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate} />
		);
		
		return (
			<div>
				
				<table className="table table-striped">
					<tbody>
						<tr>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Phone Number</th>
							<th>Email Address</th>
							<th></th>
							<th></th>
						</tr>
						{contactEntities}
					</tbody>
				</table>
				<div className="text-center">
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">Add Contact</button>&nbsp;
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#searchModal">Search Contacts</button>&nbsp;
					<button type="button" className="btn btn-primary" onClick={this.handleClearSearch}>Display All Contacts</button>
				</div>
			</div>
			
		);
	}
}

export default ContactList;