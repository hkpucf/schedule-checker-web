import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIAppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import CopyIcon from '@material-ui/icons/fileCopy';

const styles = {
	grow: {
		flexGrow: 1
	}
}

let AppBar = (props) => {
	return (
		<MUIAppBar>
			<Toolbar>
				<Typography variant="h6" color="inherit" className={props.classes.grow}>
					Room Search
				</Typography>
				<Zoom in={props.hasCopy}>
					<IconButton color="inherit" onClick={props.onCopy || null}>
						<CopyIcon />
					</IconButton>
				</Zoom>
			</Toolbar>
		</MUIAppBar>
	);
};

AppBar.propTypes = {
	classes: PropTypes.object.isRequired,
	hasCopy: PropTypes.bool.isRequired,
	onCopy: PropTypes.func
}

export default withStyles(styles)(AppBar);
