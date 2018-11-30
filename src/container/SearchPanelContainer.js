import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchPanel from '../component/SearchPanel.js'

class SearchPanelContainer extends Component {
	constructor() {
		super();

		let date = new Date();

		var startTime = '08:30';
		if((date.getHours() * 100 + date.getMinutes()) > 830 && (date.getHours() * 100 + date.getMinutes()) < 2200) {
			startTime = ('0' + date.getHours()).slice(-2) + ':' + ((date.getMinutes() < 30) ? '00' : '30');
		}

		this.state = {
			date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			dateErr: null,
			start: startTime,
			startErr: null,
			end: '22:00',
			endErr: null
		}
	}

	onChangeDate(dateStr) {
		if(dateStr == null || dateStr.length == 0) {
			this.setState({
				dateErr: 'Date is required'
			});
		} else {
			this.setState({
				date: dateStr,
				dateErr: null
			});
		}
	}

	onChangeStart(startStr) {
		if(startStr == null || startStr.length == 0) {
			this.setState({
				startErr: 'Start time is required'
			});
			return;
		}

		let timeVal = parseInt(startStr.slice(0, 2) + startStr.slice(-2));
		if(timeVal < 830 || timeVal > 2130) {
			this.setState({
				startErr: 'Time must be between 08:30 - 21:30'
			});
		} else {
			this.setState({
				start: startStr,
				startErr: null
			});
		}
	}

	onChangeEnd(endStr) {
		if(endStr == null || endStr.length == 0) {
			this.setState({
				endErr: 'End time is required'
			});
			return;
		}

		let timeVal = parseInt(endStr.slice(0, 2) + endStr.slice(-2));
		if(timeVal < 900 || timeVal > 2200) {
			this.setState({
				endErr: 'Time must be between 09:00 - 22:00'
			});
		} else {
			this.setState({
				end: endStr,
				endErr: null
			});
		}
	}

	onSubmit(e) {
		e.preventDefault();
		if(this.state.dateErr != null || this.state.startErr != null || this.state.endError != null) {
			return;
		}
		if(this.props.onSearch) {
			this.props.onSearch(this.state.date, this.state.start, this.state.end);
		}
	}

	render() {
		return (
			<SearchPanel
				date={this.state.date}
				dateErr={this.state.dateErr}
				start={this.state.start}
				startErr={this.state.startErr}
				end={this.state.end}
				endErr={this.state.endErr}
				onChangeDate={this.onChangeDate.bind(this)}
				onChangeStart={this.onChangeStart.bind(this)}
				onChangeEnd={this.onChangeEnd.bind(this)}
				onSubmit={this.onSubmit.bind(this)} />
		);
	}
}

SearchPanelContainer.propTypes = {
	onSearch: PropTypes.func
}

export default SearchPanelContainer;
