import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Grid from '@material-ui/core/Grid';
import SearchPanelContainer from './container/SearchPanelContainer.js';
import RoomListContainer from './container/RoomListContainer.js';

class App extends Component {
	constructor() {
		super();

		this.state = {
			fetching: false,
			fetchedList: []
		};
	}

	onSearch(date, start, end) {
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} md={4}>
					<SearchPanelContainer onSearch={this.onSearch} />
				</Grid>
				<Grid item xs={12} md={8}>
					<RoomListContainer list={this.state.fetchedList} />
				</Grid>
			</Grid>
		);
	}
}

document.addEventListener('DOMContentLoaded', ()=>{
	let containerDOM = document.getElementById('scheduleApp');
	containerDOM ? ReactDom.render(<App />, containerDOM) : false;
});
