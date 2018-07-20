import React from 'react';

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

export default SearchContactForm;