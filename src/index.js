import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import teal from '@material-ui/core/colors/teal';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import SnackBar from '@material-ui/core/SnackBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Axios from 'axios';
import AppBar from './component/AppBar.js';
import SearchPanelContainer from './container/SearchPanelContainer.js';
import RoomListContainer from './container/RoomListContainer.js';

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
	root: {
		flexGrow: 1
	},
	gridWrapper: {
		padding: '88 24 24'
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
			fetchedList: [],
			fetchedDate: '',
			showCopyToast: false
		};

		this.copyHandler = this.copyHandler.bind(this);
		this.onCopy = this.onCopy.bind(this);
		this.onSearch = this.onSearch.bind(this);
		this.onCloseToast = this.onCloseToast.bind(this);
	}

	copyHandler(e) {
		var plaintext = this.state.fetchedDate;
		plaintext += "\nRoom no.\tCapacity\tFurniture\tTime";
		var richtext = "<p><b>" + this.state.fetchedDate + "</b></p>";
		richtext += "<table><tr><th>Room no.</th><th>Capacity</th><th>Furniture</th><th>Time</th></tr>"
		for(var i = 0; i < this.state.fetchedList.length; i++) {
			let room = this.state.fetchedList[i];
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
				fetchedList: (res.data || []),
				fetchedDate: (res.data) ? date : ''
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
				<div className={this.props.classes.root}>
					<CssBaseline />
					<AppBar hasCopy={(this.state.fetchedList.length > 0)} onCopy={this.onCopy} />
					<div className={this.props.classes.gridWrapper}>
						<Grid container spacing={24}>
							<Grid item xs={12} md={4}>
								<SearchPanelContainer onSearch={this.onSearch} />
							</Grid>
							<Grid item xs={12} md={8} className={this.props.classes.grid}>
								{
									(this.state.fetching) ? progressBar(this.props) : null
								}
								<RoomListContainer list={this.state.fetchedList} date={this.state.fetchedDate} />
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
				</div>
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
