import React from 'react';
import ReactTable from "react-table";
import DeleteContactButton from './DeleteContactButton';
import UpdateContactButton from './UpdateContactButton';

class ContactListTable extends React.Component {
	constructor(props){
		super(props);
		this.handleClearSearch = this.handleClearSearch.bind(this);
	}
	
	handleClearSearch() {
		this.props.onClearSearch();
	}
		
		
	render() {
		const {contactEntities} = this.props;
			
		return (
			<div>
				
				<br/>
				<h1>With React Table</h1>
				
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

			
		);
	}
}

export default ContactListTable;