import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	}
});

let emptyList = () => (
	<Typography component="p" align="center">
		No records
	</Typography>
);

let displayList = (list) => (
	<Table>
		<TableHead>
			<TableRow>
				<TableCell>Room No.</TableCell>
				<TableCell>Capacity</TableCell>
				<TableCell>Furniture</TableCell>
				<TableCell>Available Time</TableCell>
			</TableRow>
		</TableHead>
		<TableBody>
			{list.map((row, id) => {
				return (
					<TableRow key={id}>
						<TableCell>{row[0]}</TableCell>
						<TableCell>{row[1]}</TableCell>
						<TableCell>{row[2]}</TableCell>
						<TableCell>{row[3]}</TableCell>
					</TableRow>
				);
			})}
		</TableBody>
	</Table>
);


let RoomList = (props) => {
	return (
		<Paper className={props.classes.root}>
			{(props.list.length > 0) ? displayList(props.list) : emptyList()}
		</Paper>
	);
}

RoomList.propTypes = {
	classes: PropTypes.object.isRequired,
	list: PropTypes.array.isRequired
};

export default withStyles(styles)(RoomList);
