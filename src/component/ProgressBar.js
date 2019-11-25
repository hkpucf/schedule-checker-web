import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = (theme) => ({
	root: {
		position: 'absolute',
		left: theme.spacing(1.5),
		right: theme.spacing(1.5)
	}
})

const ProgressBar = (props) => (
	<div className={props.classes.root}>
		<LinearProgress />
	</div>
)

ProgressBar.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProgressBar)
