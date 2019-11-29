import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import { Table, TableBody, TableRow, TableCell, IconButton, Paper, Typography } from '@material-ui/core'
import BackIcon from '@material-ui/icons/arrowBack'

let Timeslot = (props) => {
	const theme = useTheme()
	const classes = makeStyles({
		root: (props) => ({
			top: props.top * theme.spacing(3.5),
			height: props.height * theme.spacing(7),
			padding: theme.spacing(2),
			background: theme.palette.grey['300']
		})
	})(props)

	return (
		<Paper elevation={0} className={props.className + ' ' + classes.root}>
			<Typography variant="body2" align="center" display="block">
				{props.children}
			</Typography>
		</Paper>
	)
}

Timeslot.propTypes = {
	className: PropTypes.string,
	top: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}

const detailStyles = (theme) => ({
	row: {
		height: theme.spacing(7)
	},
	timeCol: {
		width: '1px',
		whiteSpace: 'nowrap'
	},
	contentCol: {
		position: 'relative',
		padding: theme.spacing(0, 2)
	},
	timeslot: {
		position: 'absolute',
		left: theme.spacing(2),
		right: theme.spacing(2)
	}
})

let TimetableDetail = (props) => {
	// Transform function
	Number.prototype.pad = function(size) {
		var s = String(this)
		while (s.length < (size || 2)) {s = "0" + s}
		return s
	}

	const getTimeByIndex = (index) => {
		return (Math.floor(index / 2)).pad(2) + ':' + ((index) % 2 * 30).pad(2)
	}

	const getIndexByTime = (time) => {
		time = time.split(':')
		return parseInt(time[0]) * 2 + Math.floor(parseInt(time[1]) / 30)
	}

	// Get reserved time
	let row = []
	let endTime = 0
	for(let i = 0, lastTime = 17; !props.fetching && i < props.timetable.length; i++) {
		let timeString = props.timetable[i][3].split(' - ')
		let startTime = getIndexByTime(timeString[0])
		endTime = getIndexByTime(timeString[1])
		if(startTime > lastTime) {
			row.push({
				startTime: lastTime,
				endTime: startTime
			})
		}
		lastTime = endTime
	}
	if(endTime < 45) {
		row.push({
			startTime: endTime,
			endTime: 45
		})
	}

	// Render table row
	let tableRow = []
	for(let i = 17, j = 0; i < 45; i += 2) {
		if(j < row.length && (row[j].startTime == i || row[j].startTime == i + 1)) {
			tableRow.push(
					<TableRow key={i} className={props.classes.row}>
						<TableCell className={props.classes.timeCol}>{getTimeByIndex(i) + ' - ' + getTimeByIndex(i + 2)}</TableCell>
						<TableCell className={props.classes.contentCol}>
							<Timeslot
								className={props.classes.timeslot} 
								top={(row[j].startTime + 1) % 2}
								height={(row[j].endTime - row[j].startTime) / 2}>
								Reserved
							</Timeslot>
						</TableCell>
					</TableRow>
				)
			j++
		} else {
			tableRow.push(
					<TableRow key={i} className={props.classes.row}>
						<TableCell className={props.classes.timeCol}>{getTimeByIndex(i) + ' - ' + getTimeByIndex(i + 2)}</TableCell>
						<TableCell className={props.classes.contentCol}></TableCell>
					</TableRow>
				)
		}
	}
	return tableRow
}

TimetableDetail.propTypes = {
	classes: PropTypes.object.isRequired,
	fetching: PropTypes.bool.isRequired,
	timetable: PropTypes.array.isRequired
}

TimetableDetail = withStyles(detailStyles)(TimetableDetail)

const timetableStyles = (theme) => ({
	title: {
		display: 'flex',
		alignItems: 'center'
	}
})

let Timetable = (props) => {
	return (
		<div>
			<div className={props.classes.title}>
				<IconButton color="inherit" onClick={props.onBack}>
					<BackIcon />
				</IconButton>
				<Typography variant="h6" display="inline">
					{props.room}
				</Typography>
			</div>
			<Table>
				<TableBody>
					<TimetableDetail fetching={props.fetching} timetable={props.timetable} />
				</TableBody>
			</Table>
		</div>
	)
}

Timetable.propTypes = {
	classes: PropTypes.object.isRequired,
	fetching: PropTypes.bool.isRequired,
	room: PropTypes.string.isRequired,
	timetable: PropTypes.array.isRequired,
	onBack: PropTypes.func
}

export default withStyles(timetableStyles)(Timetable)
