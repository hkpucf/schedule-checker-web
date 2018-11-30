import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

let emptyList = () => (
	<ListItem>
		<ListItemText>
			<Typography component="p" align="center">
				No records
			</Typography>
		</ListItemText>
	</ListItem>
);

let displayList = (list) => (
	<div>
		{list.map((row, id) => {
			var divider = (
				<Divider />
			);
			if(id == list.length - 1) {
				divider = null;
			}
			return (
				<div key={id}>
					<ListItem>
						<ListItemText
							primary={row[0] + ' [' + row[1] + ']'}
							secondary={row[2]}
						/>
						<Typography component="span" align="right">
							{row[3]}
						</Typography>
					</ListItem>
					{divider}
				</div>
			);
		})}
	</div>
);


let RoomList = (props) => {
	return (
		<Paper>
			<List>
				{(props.list.length > 0) ? displayList(props.list) : emptyList()}
			</List>
		</Paper>
	);
}

RoomList.propTypes = {
	list: PropTypes.array.isRequired
};

export default RoomList;
