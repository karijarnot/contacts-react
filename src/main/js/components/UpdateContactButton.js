import React from 'react';

class UpdateContactButton extends React.Component {
	
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick() {
		this.props.onSelectForUpdate(this.props.contact);
		$("#updateModal").modal('show');
	}
	
	render() {
		
		return (
			<div className="text-center">
				<button className="btn btn-primary btn-sm" data-toggle="modal" data-target="updateModal" onClick={this.handleClick}>Update</button>
			</div>
		)
	}
}

export default UpdateContactButton;