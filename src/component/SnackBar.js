import React, {
	memo
} from 'react'
import PropTypes from 'prop-types'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

const SnackBar = memo((props) => (
	<Snackbar
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "left"
		}}
		open={props.showToast}
		autoHideDuration={6000}
		onClose={props.onCloseToast}
		message={<span>Copied</span>}
		action={
			<IconButton color="inherit" onClick={props.onCloseToast}>
				<CloseIcon />
			</IconButton>
		}
	/>
))

SnackBar.propTypes = {
	showToast: PropTypes.bool.isRequired,
	onCloseToast: PropTypes.func.isRequired
}

export default SnackBar
