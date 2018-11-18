import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import SearchPanelContainer from './container/SearchPanelContainer.js';
import RoomListContainer from './container/RoomListContainer.js';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	grid: {
		position: 'relative'
	},
	LinearProgress: {
		position: 'absolute',
		left: theme.spacing.unit * 1.5,
		right: theme.spacing.unit * 1.5
	}
});

const progressBar = (props) => (
	<div className={props.classes.LinearProgress}>
		<LinearProgress />
	</div>
);

class App extends Component {
	constructor() {
		super();

		this.state = {
			fetching: false,
			fetchedList: []
		};
	}

	onSearch(date, start, end) {
		this.setState({
			fetching: true
		});

		let params = date.split('-');
		start = start.replace(':', '');
		end = end.replace(':', '');
		Axios.get(
			process.env.HOST + '/' + params[0] + '/' + params[1] + '/' + params[2] + '/' + start + '/' + end,
			{
				responseType: 'json'
			}
		).then((res) => {
			this.setState({
				fetching: false,
				fetchedList: res.data || []
			});
		});
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} md={4}>
					<SearchPanelContainer onSearch={this.onSearch.bind(this)} />
				</Grid>
				<Grid item xs={12} md={8} className={this.props.classes.grid}>
					{
						(this.state.fetching) ? progressBar(this.props) : null
					}
					<RoomListContainer list={this.state.fetchedList} />
				</Grid>
			</Grid>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired
};

App = withStyles(styles)(App);

document.addEventListener('DOMContentLoaded', ()=>{
	let containerDOM = document.getElementById('scheduleApp');
	containerDOM ? ReactDom.render(<App />, containerDOM) : false;
});
