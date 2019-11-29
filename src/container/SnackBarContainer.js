import { connect } from 'react-redux'
import { closeToast } from '../action'
import SnackBar from '../component/SnackBar.js'

const mapStateToProps = (state) => ({
	showToast: state.showToast
})

const mapDispatchToProps = (dispatch) => ({
	onCloseToast: () => {
		dispatch(closeToast())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SnackBar)
