import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';
import AppBar from './component/AppBar.js';
import SearchPanelContainer from './container/SearchPanelContainer.js';
import ProgressBar from './component/ProgressBar.js';
import ResultContainer from './container/ResultContainer.js';

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: teal,
	},
	typography: {
		useNextVariants: true
	}
});

const styles = (theme) => ({
	gridWrapper: {
		padding: '88px 24px 24px'
	},
	grid: {
		position: 'relative'
	}
});

class App extends Component {
	constructor() {
		super();

		this.state = {
			roomList: {
				fetching: false,
				fetchedList: [],
				fetchedDate: ''
			},
			selectedRoom: {
				fetching: false,
				room: null,
				timetable: []
			},
			showCopyToast: false
		};

		this.copyHandler = this.copyHandler.bind(this);
		this.onCopy = this.onCopy.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onSelectRoom = this.onSelectRoom.bind(this);
		this.onCloseToast = this.onCloseToast.bind(this);
	}

	copyHandler(e) {
		var plaintext = this.state.roomList.fetchedDate;
		plaintext += "\nRoom no.\tCapacity\tFurniture\tTime";
		var richtext = "<p><b>" + this.state.roomList.fetchedDate + "</b></p>";
		richtext += "<table><tr><th>Room no.</th><th>Capacity</th><th>Furniture</th><th>Time</th></tr>"
		for(var i = 0; i < this.state.roomList.fetchedList.length; i++) {
			let room = this.state.roomList.fetchedList[i];
			plaintext += '\n' + room[0] + "\t\t" + room[1] + "\t\t" + room[2] + "\t\t" + room[3];
			richtext += "<tr><td>" + room[0] + "</td><td>" + room[1] + "</td><td>" + room[2] + "</td><td>" + room[3] + "</td></tr>";
		}
		richtext += "</table>";

		e.clipboardData.setData('text/plain', plaintext);
		e.clipboardData.setData('text/html', richtext);
		this.setState({
			showCopyToast: true
		});
		e.preventDefault();
	}

	onCopy() {
		document.addEventListener('copy', this.copyHandler);
		document.execCommand('copy');
		document.removeEventListener('copy', this.copyHandler);
	}

	onSearch(date, start, end) {
		this.setState((prevState) => {
			let roomList = Object.assign({}, prevState.roomList, {
				fetching: true
			})

			return {
				roomList: roomList
			}
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
				roomList: {
					fetching: false,
					fetchedList: (res.data || []),
					fetchedDate: (res.data) ? date : ''
				},
				selectedRoom: {
					fetching: false,
					room: null,
					timetable: []
				}
			});
		});
	}

	onSelectRoom(room, callback) {
		this.setState({
			selectedRoom: {
				fetching: room != null,
				room: room,
				timetable: []
			}
		}, callback)

		if(room == null) {
			return
		}

		let params = this.state.roomList.fetchedDate.split('-');
		Axios.get(
			process.env.HOST + '/' + params[0] + '/' + params[1] + '/' + params[2] + '/' + room,
			{
				responseType: 'json'
			}
		).then((res) => {
			this.setState({
				selectedRoom: {
					fetching: false,
					room: room,
					timetable: res.data
				}
			});
		});
	}

	onCloseToast() {
		this.setState({
			showCopyToast: false
		})
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar hasCopy={(this.state.roomList.fetchedList.length > 0)} onCopy={this.onCopy} />
				<div className={this.props.classes.gridWrapper}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<SearchPanelContainer onSearch={this.onSearch} />
						</Grid>
						<Grid item xs={12} md={8} className={this.props.classes.grid}>
							{
								(this.state.roomList.fetching || (this.state.selectedRoom && this.state.selectedRoom.fetching)) ? <ProgressBar /> : null
							}
							<ResultContainer roomList={this.state.roomList} selectedRoom={this.state.selectedRoom} onSelectRoom={this.onSelectRoom} />
						</Grid>
					</Grid>
				</div>
				<SnackBar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "left"
					}}
					open={this.state.showCopyToast}
					autoHideDuration={6000}
					onClose={this.onCloseToast}
					message={<span>Copied</span>}
					action={
						<IconButton color="inherit" onClick={this.onCloseToast}>
							<CloseIcon />
						</IconButton>
					}
				/>
			</MuiThemeProvider>
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
