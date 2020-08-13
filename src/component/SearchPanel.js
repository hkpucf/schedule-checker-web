import React, {
	memo
} from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
	Card,
	CardContent,
	CardActions,
	TextField,
	Button
} from '@material-ui/core'
import {
	Search as SearchIcon
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	form: {
		margin: 0
	},
	contentCard: {
		padding: theme.spacing(2, 3, 1)
	},
	textField: {
		margin: '3px 0'
	}
}))

const SearchPanel = memo((props) => {
	const classes = useStyles()

	return (
		<Card square>
			<form className={classes.form} onSubmit={props.onSubmit || null}>
				<CardContent className={classes.contentCard}>
					<div>
						<TextField
							label="Date"
							type="date"
							fullWidth
							className={classes.textField}
							defaultValue={props.date}
							error = {props.dateErr != null}
							helperText = {props.dateErr || " "}
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => {
								if(props.onChangeDate) {
									props.onChangeDate(e.target.value)
								}
							}}
						/>
					</div>
					<div>
						<TextField
							label="Start Time"
							type="time"
							fullWidth
							className={classes.textField}
							defaultValue={props.start}
							error = {props.startErr != null}
							helperText = {props.startErr || " "}
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => {
								if(props.onChangeStart) {
									props.onChangeStart(e.target.value)
								}
							}}
						/>
					</div>
					<div>
						<TextField
							label="End Time"
							type="time"
							fullWidth
							className={classes.textField}
							defaultValue={props.end}
							error = {props.endErr != null}
							helperText = {props.endErr || " "}
							InputLabelProps={{
								shrink: true
							}}
							onChange={(e) => {
								if(props.onChangeEnd) {
									props.onChangeEnd(e.target.value)
								}
							}}
						/>
					</div>
				</CardContent>
				<CardActions>
					<Button
						size="small"
						color="primary"
						type="submit"
						onClick={props.onSubmit || null}>
							<SearchIcon />
							Search
					</Button>
				</CardActions>
			</form>
		</Card>
	)
})

SearchPanel.propTypes = {
	date: PropTypes.string.isRequired,
	start: PropTypes.string.isRequired,
	end: PropTypes.string.isRequired,
	dateErr: PropTypes.string,
	startErr: PropTypes.string,
	endErr: PropTypes.string,
	onChangeDate: PropTypes.func,
	onChangeStart: PropTypes.func,
	onChangeEnd: PropTypes.func,
	onSubmit: PropTypes.func
}

export default SearchPanel
