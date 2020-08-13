import React, {
	memo
} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		left: theme.spacing(1.5),
		right: theme.spacing(1.5)
	}
}))

const ProgressBar = memo((props) => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<LinearProgress />
		</div>
	)
})

export default ProgressBar
