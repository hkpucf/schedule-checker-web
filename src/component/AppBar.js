import React, {
	memo
} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
	AppBar as MUIAppBar,
	Toolbar,
	Typography,
	Zoom,
	IconButton
} from '@material-ui/core'
import {
	FileCopy as CopyIcon
} from '@material-ui/icons'

const useStyles = makeStyles({
	grow: {
		flexGrow: 1
	}
})

let AppBar = memo(({hasCopy, onCopy, ...props}) => {
	const classes = useStyles()
	return (
		<MUIAppBar {...props}>
			<Toolbar>
				<Typography variant="h6" color="inherit" className={classes.grow}>
					Room Search
				</Typography>
				<Zoom in={onCopy && hasCopy}>
					<IconButton color="inherit" onClick={onCopy}>
						<CopyIcon />
					</IconButton>
				</Zoom>
			</Toolbar>
		</MUIAppBar>
	)
})

AppBar.propTypes = {
	hasCopy: PropTypes.bool.isRequired,
	onCopy: PropTypes.func
}

export default AppBar
