import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchPanel from '../component/SearchPanel.js'

class SearchPanelContainer extends Component {
	constructor() {
		super();

		let date = new Date();
		this.state = {
			date: date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
			start: '08:30',
			end: '22:00'
		}
	}

	onChangeDate(dateStr) {
		this.setState({
			date: dateStr
		})
	}

	onChangeStart(startStr) {
		this.setState({
			start: startStr
		});
	}

	onChangeEnd(endStr) {
		this.setState({
			end: endStr
		})
	}

	onSubmit() {
		if(this.props.onSearch) {
			this.props.onSearch(this.state.date, this.state.start, this.state.end);
		}
	}

	render() {
		return (
			<SearchPanel
				date={this.state.date}
				start={this.state.start}
				end={this.state.end}
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
