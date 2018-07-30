import React from 'react';

class UpdateContactForm extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			selectedContact: Object.assign({}, this.props.selectedContact)
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}
	
	componentWillReceiveProps(nextProps) {
	    if (this.props.selectedContact.id != nextProps.selectedContact.id) {
	    	this.setState({selectedContact: Object.assign({}, nextProps.selectedContact)});
	    }
	  }
	
	handleChange(event) {
		const field = event.target.name;
	    let selectedContact = Object.assign({}, this.state.selectedContact);
	    selectedContact[field] = event.target.value;
	    return this.setState({selectedContact: selectedContact});
	}
	
	  handleSubmit(event) {
		    event.preventDefault();
		    const contact = this.state.selectedContact;
		    this.props.onUpdate(contact, this.props.selectedContact.id);
		    
		    $("#updateModal").modal('hide');
		  }
	  
	  handleReset(event) {
		  this.setState({
			  selectedContact: {
					firstName: this.props.selectedContact.firstName,
					lastName: this.props.selectedContact.lastName,
					phoneNumber: this.props.selectedContact.phoneNumber,
					email: this.props.selectedContact.email
				}
		  });

	  }
	  
  render() {
	  
    return (
    		
    		
    		<div className="modal fade" id="updateModal" tabIndex="-1" role="dialog" aria-labelledby="updateModalLabel" aria-hidden="true">
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
					<input type="text" className="form-control" id="updateFirstName" name="firstName" value={this.state.selectedContact.firstName || ''} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="updateLastName">Last Name</label> 
					<input type="text" className="form-control" id="updateLastName" name="lastName" value={this.state.selectedContact.lastName || ''} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="updatePhoneNumber">Phone Number</label> 
					<input type="text" className="form-control" id="updatePhoneNumber" name="phoneNumber" value={this.state.selectedContact.phoneNumber || ''} onChange={this.handleChange}  />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="updateEmail">Email</label> 
					<input type="text" className="form-control" id="updateEmail" name="email" value={this.state.selectedContact.email || ''} onChange={this.handleChange}  />
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

export default UpdateContactForm;