import React from 'react'
import PropTypes from 'prop-types'
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core'

let TimetableDetail = () => {
	Number.prototype.pad = function(size) {
		var s = String(this)
		while (s.length < (size || 2)) {s = "0" + s}
		return s
	}

	let getTimeByIndex = (index) => {
		return (Math.floor(index / 2)).pad(2) + ':' + ((index) % 2 * 30).pad(2)
	}

	let row = []
	for(let i = 17; i < 44; i++) {
		row.push(
				<TableRow key={i}>
					<TableCell>{getTimeByIndex(i) + ' - ' + getTimeByIndex(i + 1)}</TableCell>
					<TableCell></TableCell>
				</TableRow>
			)
	}
	return row
}

TimetableDetail.propTypes = {
	fetching: PropTypes.bool.isRequired,
	timetable: PropTypes.array.isRequired
}

let Timetable = (props) => {
	console.log(props.timetable)
	return (
		<Table>
			<TableHead>
				<TableRow>
					<TableCell rowSpan={2}>{props.room}</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TimetableDetail fetching={props.fetching} timetable={props.timetable} />
			</TableBody>
		</Table>
	)
}

Timetable.propTypes = {
	fetching: PropTypes.bool.isRequired,
	room: PropTypes.string.isRequired,
	timetable: PropTypes.array.isRequired
}

export default Timetable
