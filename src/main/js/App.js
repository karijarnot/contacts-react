'use strict';

import axios from 'axios';

const React = require('react');
const ReactDOM = require('react-dom')


class App extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			contactEntities: [],
			links: {}
		};
		this.onCreate = this.onCreate.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onClearSearch = this.onClearSearch.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
		
	}
	
	
	loadFromServer() {
		
		axios.get('/api/contactEntities')
		  .then(response => {
		    const contactEntities = response.data._embedded.contactEntities;
		    this.setState({contactEntities});
		  })
		  .catch(error => {
		    console.log(error);
		  });
	}
	
	onDelete(contact) {
		
		axios.delete(contact._links.self.href).then(res => {
			console.log(res);
			this.loadFromServer();
		});
		
	}
	
	onUpdate(contact, href) {
		
		axios.put(href, contact).then(response =>{
			console.log(response);
			this.loadFromServer();
		}).catch(error =>{
			console.log(error);
		});

	}
	
	
	onCreate(contact) {
		
		axios.post('/api/contactEntities', contact).then(response =>{
			console.log(response);
			this.loadFromServer();
		}).catch(error =>{
			console.log(error);
		});

	}
	
	onSearch(contact) {

		axios.get('/api/contactEntities/search/findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase', 
			{params: contact}).then(res => {
    	  
			const contactEntities = res.data._embedded.contactEntities;
		    this.setState({contactEntities});
		}).catch(error =>{
			console.log(error);
		});
	}
	
	onClearSearch() {
		this.loadFromServer();
	}
	
	componentDidMount() {
		this.loadFromServer();
		
	}
	
  render() {
    return (
    	<div>
    		<ContactList contactEntities={this.state.contactEntities} onDelete={this.onDelete} onClearSearch={this.onClearSearch} onUpdate={this.onUpdate}  />
    		<AddContactForm onCreate={this.onCreate} />		
    		<SearchContactForm onSearch={this.onSearch} />
    	</div>
    );
  }
}

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
			<Contact key={contact._links.self.href} contact={contact} onDelete={this.props.onDelete} onUpdate={this.props.onUpdate} />
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

class Contact extends React.Component {
	
	constructor(props) {
		super(props);
	
		this.handleDelete = this.handleDelete.bind(this);
	}
	
	handleDelete() {
		this.props.onDelete(this.props.contact);
	}

	render() {
		
		var modalId = 'updateModal'+ this.props.contact._links.self.href.substring(this.props.contact._links.self.href.lastIndexOf('/') + 1);
			
		return(
			<tr>
				<td>{this.props.contact.firstName}</td>
				<td>{this.props.contact.lastName}</td>
				<td>{this.props.contact.phoneNumber}</td>
				<td>{this.props.contact.email}</td>
				<td>
					<button className="btn btn-primary" data-toggle="modal" data-target={'#' + modalId}>Update</button>
					<UpdateContactForm selectedContact={this.props.contact} modalId={modalId} onUpdate={this.props.onUpdate}/>
				</td>
				<td>
					<button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
				</td>
			</tr>
		)
	}
}

class SearchContactForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}
	
	handleSubmit(event) {
	    event.preventDefault();
	    
	    const contact = this.state;
	    
	    this.props.onSearch(contact);
	    
	    this.setState({
			firstName: '',
			lastName: ''
	    });

	    $('#searchModal').modal('hide');
	  }
  
  handleReset(event) {
	  this.setState({
			firstName: '',
			lastName: ''
	  });
  }
  
  render() {
	  return (
			<div className="modal fade" id="searchModal" tabIndex="-1" role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="searchModalLabel">Search Contacts</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<form onSubmit={this.handleSubmit}>
							<div className="modal-body">
								<div className="form-group">
									<label className="control-label" htmlFor="findFirstName">First Name</label> 
									<input type="text" className="form-control" id="findFirstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
								</div>
								<div className="form-group">
									<label className="control-label" htmlFor="findLastName">Last Name</label> 
									<input type="text" className="form-control" id="findLastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
								</div>
							</div>
							<div className="modal-footer">
								<input type="submit" value="Submit" className="btn btn-primary" /> 
								<input type="reset" value="Reset" className="btn btn-secondary" onClick={this.handleReset} />
								<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
							</div>
						</form>
					</div>
				</div>
			</div>
	  );
  }
}

class UpdateContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstName: this.props.selectedContact.firstName,
			lastName: this.props.selectedContact.lastName,
			phoneNumber: this.props.selectedContact.phoneNumber,
			email: this.props.selectedContact.email
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}
	
	  handleSubmit(event) {
		    event.preventDefault();
		    const contact = this.state;
		    this.props.onUpdate(contact, this.props.selectedContact._links.self.href);
		    
		    $("#" + this.props.modalId).modal('hide');
		  }
	  
	  handleReset(event) {
		  this.setState({
			  	firstName: this.props.selectedContact.firstName,
				lastName: this.props.selectedContact.lastName,
				phoneNumber: this.props.selectedContact.phoneNumber,
				email: this.props.selectedContact.email
		  });

	  }
	
  render() {
    return (
    		
    		<div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
    		<div className="modal-dialog" role="document">
    			<div className="modal-content">
    				<div className="modal-header">
    					<h5 className="modal-title" id="updateModalLabel">Update Contact</h5>
    					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
    					</button>
    				</div>
    		
    		<form onSubmit={this.handleSubmit}>
			<div className="modal-body">
				<div className="form-group">
					<label className="control-label" htmlFor="updateFirstName">First Name</label> 
					<input type="text" className="form-control" id="updateFirstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="updateLastName">Last Name</label> 
					<input type="text" className="form-control" id="updateLastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="updatePhoneNumber">Phone Number</label> 
					<input type="text" className="form-control" id="updatePhoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}  />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="updateEmail">Email</label> 
					<input type="text" className="form-control" id="updateEmail" name="email" value={this.state.email} onChange={this.handleChange}  />
				</div>
			</div>
			<div className="modal-footer">
				<input type="submit" value="Submit" className="btn btn-primary" /> 
				<input type="reset" value="Reset" className="btn btn-secondary" onClick={this.handleReset} />
				<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</form>
		
		</div>
		</div>
	</div>

    );
  }
}


class AddContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			phoneNumber: '',
			email: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	
	handleChange(event) {
		const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });
	}
	
	  handleSubmit(event) {
		    event.preventDefault();
		    
		    const contact = this.state;
		    
		    this.props.onCreate(contact);
		    
		    this.setState({
					firstName: '',
					lastName: '',
					phoneNumber: '',
					email: ''
			});

		    $('#addModal').modal('hide');
		  }
	  
	  handleReset(event) {
		  this.setState({
				firstName: '',
				lastName: '',
				phoneNumber: '',
				email: ''
		  });
	  }
	
  render() {
    return (
    		
    		<div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
    		<div className="modal-dialog" role="document">
    			<div className="modal-content">
    				<div className="modal-header">
    					<h5 className="modal-title" id="addModalLabel">Add Contact</h5>
    					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
    					</button>
    				</div>
    		
    		<form onSubmit={this.handleSubmit}>
			<div className="modal-body">
				<div className="form-group">
					<label className="control-label" htmlFor="addFirstName">First Name</label> 
					<input type="text" className="form-control" id="addFirstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="addLastName">Last Name</label> 
					<input type="text" className="form-control" id="addLastName" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="addPhoneNumber">Phone Number</label> 
					<input type="text" className="form-control" id="addPhoneNumber" name="phoneNumber" value={this.state.phoneNumber} onChange={this.handleChange}  />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="addEmail">Email</label> 
					<input type="text" className="form-control" id="addEmail" name="email" value={this.state.email} onChange={this.handleChange}  />
				</div>
			</div>
			<div className="modal-footer">
				<input type="submit" value="Submit" className="btn btn-primary" /> 
				<input type="reset" value="Reset" className="btn btn-secondary" onClick={this.handleReset} />
				<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			</div>
		</form>
		
		</div>
		</div>
	</div>

    );
  }
}


export default App;