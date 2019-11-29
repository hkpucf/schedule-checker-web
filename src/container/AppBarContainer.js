import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { showToast } from '../action'
import AppBar from '../component/AppBar.js'

let AppBarContainer = (props) => {
	const copyHandler = (e) => {
		var plaintext = props.fetchedDate
		plaintext += "\nRoom no.\tCapacity\tFurniture\tTime"
		var richtext = "<p><b>" + props.fetchedDate + "</b></p>"
		richtext += "<table><tr><th>Room no.</th><th>Capacity</th><th>Furniture</th><th>Time</th></tr>"
		for(var i = 0; i < props.fetchedList.length; i++) {
			let room = props.fetchedList[i]
			plaintext += '\n' + room[0] + "\t\t" + room[1] + "\t\t" + room[2] + "\t\t" + room[3]
			richtext += "<tr><td>" + room[0] + "</td><td>" + room[1] + "</td><td>" + room[2] + "</td><td>" + room[3] + "</td></tr>"
		}
		richtext += "</table>"

		e.clipboardData.setData('text/plain', plaintext)
		e.clipboardData.setData('text/html', richtext)
		props.showToast()
		e.preventDefault()
	}

	const onCopy = () => {
		document.addEventListener('copy', copyHandler)
		document.execCommand('copy')
		document.removeEventListener('copy', copyHandler)
	}

	return (
		<AppBar hasCopy={(props.fetchedList.length > 0)} onCopy={onCopy} />
	)
}

AppBarContainer.propTypes = {
	fetchedDate: PropTypes.string.isRequired,
	fetchedList: PropTypes.array.isRequired,
	showToast: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	fetchedDate: state.roomList.fetchedDate,
	fetchedList: state.roomList.fetchedList
})

const mapDispatchToProps = (dispatch) => ({
	showToast: () => {
		dispatch(showToast())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppBarContainer)
