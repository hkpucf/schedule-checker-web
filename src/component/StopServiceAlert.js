import React, {
	Fragment,
	memo,
	useCallback,
	useState
} from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Typography,
	makeStyles
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
	alertBar: {
		padding: theme.spacing(.5, 2),
		background: theme.palette.warning.main,
		color: theme.palette.warning.contrastText,
	},
	dialogAction: {
		textAlign: 'right'
	}
}))

const StopServiceAlert = memo(({className}) => {
	const [showDetail, setShowDetail] = useState(false)

	const onShow = useCallback(() => {
		setShowDetail(true)
	}, [])

	const onClose = useCallback(() => {
		setShowDetail(false)
	}, [])

	const classes = useStyles()
	return (
		<Fragment>
			<Box className={clsx(classes.alertBar, className)} component={Typography}>
				Please be informed that <strong>Room Search</strong> will be closed by the end of August, 2023.
				&nbsp;
				<Link component='button' variant='body2' onClick={onShow}>
					More details
				</Link>
			</Box>
			<Dialog open={showDetail} onClose={onClose}>
				<DialogTitle>
					Notice
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						We deeply regret to inform you that our room search platform will be closed by the end of this August. We would like to express our sincere gratitude for your support and usage of our platform throughout its existence.
					</DialogContentText>
					<DialogContentText>
						To ensure the continuous availability of this service, <strong><u>we are seeking contributions from staff members</u></strong> who are interested in taking over the maintenance and further development of the platform. If you are passionate about helping students find suitable activity venues, we invite you to contact us at <Link href='mailto:yiuhang.wong@connect.polyu.hk'>yiuhang.wong@connect.polyu.hk</Link> to express your interest and discuss the possibilities of continuing this valuable resource.
					</DialogContentText>
					<DialogContentText>
						Thank you once again for being a part of our community and for considering this opportunity to contribute.
					</DialogContentText>
				</DialogContent>
				<DialogActions className={classes.dialogAction}>
					<Button onClick={onClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	)
})

export default StopServiceAlert
