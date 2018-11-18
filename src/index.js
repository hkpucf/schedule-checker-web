import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Grid from '@material-ui/core/Grid';
import SearchPanelContainer from './container/SearchPanelContainer.js';
import RoomListContainer from './container/RoomListContainer.js';

class App extends Component {
	constructor() {
		super();

		this.state = {
		};
	}

	render() {
		return (
			<Grid container spacing={24}>
				<Grid item xs={12} sm={4}>
					<SearchPanelContainer />
				</Grid>
				<Grid item xs={12} sm={8}>
					<RoomListContainer />
				</Grid>
			</Grid>
		);
	}
}

document.addEventListener('DOMContentLoaded', ()=>{
	let containerDOM = document.getElementById('scheduleApp');
	containerDOM ? ReactDom.render(<App />, containerDOM) : false;
});
