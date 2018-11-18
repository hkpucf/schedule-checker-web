import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
	form: {
		margin: 0
	},
	textField: {
		width: '100%'
	}
};

const SearchPanel = (props) => {
	return (
		<Card>
			<form className={props.classes.form} onSubmit={props.onSubmit || null}>
				<CardContent>
					<div>
						<TextField
							label="Date"
							type="date"
							className={props.classes.textField}
							defaultValue={props.date}
							onChange={(e) => {
								if(props.onChangeDate) {
									props.onChangeDate(e.target.value);
								}
							}}
						/>
					</div>
					<div>
						<TextField
							label="Start Time"
							type="time"
							className={props.classes.textField}
							defaultValue={props.start}
							onChange={(e) => {
								if(props.onChangeStart) {
									props.onChangeStart(e.target.value);
								}
							}}
						/>
					</div>
					<div>
						<TextField
							label="End Time"
							type="time"
							className={props.classes.textField}
							defaultValue={props.end}
							onChange={(e) => {
								if(props.onChangeEnd) {
									props.onChangeEnd(e.target.value);
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
							Search
					</Button>
				</CardActions>
			</form>
		</Card>
	);
}

SearchPanel.propTypes = {
	classes: PropTypes.object.isRequired,
	date: PropTypes.string.isRequired,
	start: PropTypes.string.isRequired,
	end: PropTypes.string.isRequired,
	onChangeDate: PropTypes.func,
	onChangeStart: PropTypes.func,
	onChangeEnd: PropTypes.func,
	onSubmit: PropTypes.func
};

export default withStyles(styles)(SearchPanel);
