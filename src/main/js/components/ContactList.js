import React from 'react';
import ReactTable from "react-table";
import ContactRow from './ContactRow';
import DeleteContactButton from './DeleteContactButton';
import UpdateContactButton from './UpdateContactButton';

class ContactList extends React.Component {
	constructor(props){
		super(props);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}
	
	handleClearSearch() {
		this.props.onClearSearch();
	}
		
		
	render() {
		const {contactEntities} = this.props;
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
				<div className="text-center">
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addModal">Add Contact</button>&nbsp;
					<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#searchModal">Search Contacts</button>&nbsp;
					<button type="button" className="btn btn-primary" onClick={this.handleClearSearch}>Display All Contacts</button>
				</div>
				
				<div>
				<h1>With React Table</h1>
				<br/>
			        <ReactTable
			          data={contactEntities}
			        
			          noDataText="No Contacts Loaded"
			          columns={[
			            {
			              Header: "Name",
			              columns: [
			                {
			                  Header: "First Name",
			                  accessor: "firstName",
			                  filterable: true
			                },
			                {
			                  Header: "Last Name",
			                  accessor: "lastName",
			                	  filterable: true
			                }
			              ]
			            },
			            {
			              Header: "Info",
			              columns: [
			                {
			                  Header: "Phone Number",
			                  accessor: "phoneNumber"
			                },
			                {
			                  Header: "Email Address",
			                  accessor: "email"
			                }
			              ]
			            }
			            ,
			            {
			              Header: "Actions",
			              columns: [
			            	  {
				                  Header: "",
				                  Cell: ({row, original}) => (
				                  <UpdateContactButton contact={original} onUpdate={this.props.onUpdate}  />
				                 )
				                },
			            	  {
			                  Header: "",
			                  Cell: ({row, original}) => (
			                  <DeleteContactButton contact={original} onDelete={this.props.onDelete} />
			                 )
			                }
			                
			              ]
			            }
			          ]}
			        
			        defaultSorted={[
			            {
			              id: "lastName",
			              desc: false
			            }
			          ]}
			          defaultPageSize={5}
			          className="-striped -highlight"
			        />
				
		        </div>
		    </div>
			
		);
	}
}

export default ContactList;