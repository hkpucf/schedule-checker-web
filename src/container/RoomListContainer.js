import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { RoomList, EmptyList } from '../component/RoomList.js'

let RoomListContainer = (props) => {
	return (
		<Paper square>
			{(props.list.length > 0) ? <RoomList list={props.list} date={props.date} /> : <EmptyList />}
		</Paper>
	);
}

RoomListContainer.propTypes = {
	list: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired
};

export default RoomListContainer;
