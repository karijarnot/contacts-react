import React from 'react';


class DeleteContactButton extends React.Component {
	
	constructor(props) {
		super(props);
		
		this.handleDelete = this.handleDelete.bind(this);
	}
	
	handleDelete() {
		this.props.onDelete(this.props.contact);
	}

	render() {
		
			
		return(
			<div className="text-center">
				<button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
			</div>
		)
	}
}

export default DeleteContactButton;