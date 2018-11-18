import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RoomList from '../component/RoomList.js'

class RoomListContainer extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<RoomList list={this.props.list} />
		);
	}
}

RoomListContainer.propTypes = {
	list: PropTypes.array.isRequired
}

export default RoomListContainer;
