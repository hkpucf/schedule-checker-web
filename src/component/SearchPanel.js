import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/search'

const styles = {
	form: {
		margin: 0
	},
	contentCard: {
		padding: '16px 24px 8px'
	},
	textField: {
		margin: '3px 0'
	}
}

const SearchPanel = (props) => {
	return (
		<Card square>
			<form className={props.classes.form} onSubmit={props.onSubmit || null}>
				<CardContent className={props.classes.contentCard}>
					<div>
						<TextField
							label="Date"
							type="date"
							fullWidth
							className={props.classes.textField}
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
							className={props.classes.textField}
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
							className={props.classes.textField}
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
}

SearchPanel.propTypes = {
	classes: PropTypes.object.isRequired,
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

export default withStyles(styles)(SearchPanel)
