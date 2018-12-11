import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

let EmptyList = () => (
	<List>
		<ListItem>
			<ListItemText>
				<Typography component="span" align="center">
					No records
				</Typography>
			</ListItemText>
		</ListItem>
	</List>
);

let RoomList = (props) => {
	let date = new Date(props.date)
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];
	return (
		<List>
			<ListItem>
				<ListItemText>
					<Typography variant="subtitle1" color="textSecondary" gutterBottom>
						{date.getFullYear() + ' ' + monthNames[date.getMonth()] + ' ' + date.getDate()}
					</Typography>
				</ListItemText>
			</ListItem>
			{props.list.map((row, id) => {
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
						{(id != props.list.length - 1) ? (<Divider />) : null}
					</div>
				);
			})}
		</List>
	);
}

RoomList.propTypes = {
	list: PropTypes.array.isRequired,
	date: PropTypes.string.isRequired
}

export { RoomList, EmptyList };
