import React from 'react';
import ContactRow from './ContactRow';

class ContactList extends React.Component {
	constructor(props){
		super(props);
	}
		
		
	render() {

		var contactEntitiesRows = this.props.contactEntities.map(contact =>
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
						{contactEntitiesRows}
					</tbody>
				</table>
		    </div>
			
		);
	}
}

export default ContactList;