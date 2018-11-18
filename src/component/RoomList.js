import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	}
});

let RoomList = (props) => {
	return (
		<Paper className={props.classes.root}>
			<Typography component="p">
				List
			</Typography>
		</Paper>
	);
}

RoomList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RoomList);
