import React, {
	memo
} from 'react'
import {
	useDispatch,
	useSelector
} from 'react-redux'
import { showToast } from '../action'
import AppBar from '../component/AppBar.js'

let AppBarContainer = memo((props) => {
	const dispatch = useDispatch()
	const fetchedDate = useSelector(state => state.roomList.fetchedDate)
	const fetchedList = useSelector(state => state.roomList.fetchedList)

	const copyHandler = (e) => {
		var plaintext = fetchedDate
		plaintext += "\nRoom no.\tCapacity\tFurniture\tTime"
		var richtext = "<p><b>" + fetchedDate + "</b></p>"
		richtext += "<table><tr><th>Room no.</th><th>Capacity</th><th>Furniture</th><th>Time</th></tr>"
		for(var i = 0; i < fetchedList.length; i++) {
			let room = fetchedList[i]
			plaintext += '\n' + room[0] + "\t\t" + room[1] + "\t\t" + room[2] + "\t\t" + room[3]
			richtext += "<tr><td>" + room[0] + "</td><td>" + room[1] + "</td><td>" + room[2] + "</td><td>" + room[3] + "</td></tr>"
		}
		richtext += "</table>"

		e.clipboardData.setData('text/plain', plaintext)
		e.clipboardData.setData('text/html', richtext)
		dispatch(showToast())
		e.preventDefault()
	}

	const onCopy = () => {
		document.addEventListener('copy', copyHandler)
		document.execCommand('copy')
		document.removeEventListener('copy', copyHandler)
	}

	return (
		<AppBar hasCopy={(fetchedList.length > 0)} onCopy={onCopy} {...props} />
	)
})

export default AppBarContainer
