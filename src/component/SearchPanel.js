import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const SearchPanel = () => {
	let date = new Date();
	let today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
	return (
		<Card>
			<CardContent>
				<TextField
					label="Date"
					type="date"
					defaultValue={today}
					onChange={(e) => {console.log(e.target.value)}}
				/>
				<TextField
					label="Start Time"
					type="time"
					defaultValue="08:30"
					onChange={(e) => {console.log(e.target.value)}}
				/>
				<TextField
					label="End Time"
					type="time"
					defaultValue="22:00"
					onChange={(e) => {console.log(e.target.value)}}
				/>
			</CardContent>
			<CardActions>
				<Button size="small" color="primary">Search</Button>
			</CardActions>
		</Card>
	);
}

export default SearchPanel;
