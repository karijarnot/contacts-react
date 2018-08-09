import React from 'react';

class ContactForm extends React.Component {
	
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
		    this.props.onSubmit(contact, this.props.selectedContact.id);
		    this.setState({
		    	selectedContact: {}
		    });
		    
		    $('#' + this.props.modalId).modal('hide');
		  }
	  
	  handleReset(event) {
		  this.setState({
			  selectedContact: Object.assign({}, this.props.selectedContact)
		  });

	  }
	  
  render() {
	  
    return (
    		
    		
    		<div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby="contactModalLabel" aria-hidden="true">
    		<div className="modal-dialog" role="document">
    			<div className="modal-content">
    				<div className="modal-header">
    					<h5 className="modal-title" id="contactModalLabel">Contact</h5>
    					<button type="button" className="close" data-dismiss="modal" aria-label="Close">
    						<span aria-hidden="true">&times;</span>
    					</button>
    				</div>
    		
    		<form onSubmit={this.handleSubmit}>
			<div className="modal-body">
				<div className="form-group">
					<label className="control-label" htmlFor="contactFirstName">First Name</label> 
					<input type="text" className="form-control" id="contactFirstName" name="firstName" value={this.state.selectedContact.firstName || ''} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="contactLastName">Last Name</label> 
					<input type="text" className="form-control" id="contactLastName" name="lastName" value={this.state.selectedContact.lastName || ''} onChange={this.handleChange} required />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="contactPhoneNumber">Phone Number</label> 
					<input type="text" className="form-control" id="contactPhoneNumber" name="phoneNumber" value={this.state.selectedContact.phoneNumber || ''} onChange={this.handleChange}  />
				</div>
				<div className="form-group">
					<label className="control-label" htmlFor="contactEmail">Email</label> 
					<input type="text" className="form-control" id="contactEmail" name="email" value={this.state.selectedContact.email || ''} onChange={this.handleChange}  />
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

export default ContactForm;