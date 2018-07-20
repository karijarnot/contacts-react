import React from 'react';

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
export default AddContactForm;