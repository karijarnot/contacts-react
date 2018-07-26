import React from 'react';

import UpdateContactForm from './UpdateContactForm';

class UpdateContactButton extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		
		var modalId = 'updateModal'+ this.props.contact.id;
		return (
			<div className="text-center">
				<button className="btn btn-primary btn-sm" data-toggle="modal" data-target={'#' + modalId}>Update</button>
				<UpdateContactForm selectedContact={this.props.contact} modalId={modalId} onUpdate={this.props.onUpdate}/>
			</div>
		)
	}
}

export default UpdateContactButton;