import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { animateScroll as Scroll, Events as ScrollEvents } from 'react-scroll'
import { RoomList, EmptyList } from '../component/RoomList.js'
import Timetable from '../component/Timetable.js'

class ResultContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lastScrollTop: -1
		}

		this.getChild.bind(this)
	}

	componentWillUnmount() {
		ScrollEvents.scrollEvent.remove('end')
	}

	onSelectRoom(room) {
		ScrollEvents.scrollEvent.register('end', () => {
			this.setState({
				lastScrollTop: window.scrollY
			}, () => {
				this.props.onSelectRoom && this.props.onSelectRoom(room)
			})
			ScrollEvents.scrollEvent.remove('end')
		})
		Scroll.scrollToTop({
			smooth: true,
			duration: 500
		})
	}

	onBack() {
		let lastScrollTop = this.state.lastScrollTop
		this.props.onSelectRoom && this.props.onSelectRoom(null, () => {
			this.setState({
				lastScrollTop: -1
			}, () => {
				Scroll.scrollTo(lastScrollTop, {
					smooth: true,
					duration: 500
				})
			})
		})
	}

	getChild() {
		if(this.props.roomList.fetchedList.length < 1) {
			return <EmptyList />
		}
		if(this.props.selectedRoom.room != null) {
			return <Timetable fetching={this.props.selectedRoom.fetching} room={this.props.selectedRoom.room} timetable={this.props.selectedRoom.timetable} />
		} else {
			return <RoomList list={this.props.roomList.fetchedList} date={this.props.roomList.fetchedDate} onSelectRoom={this.onSelectRoom.bind(this)} />
		}
	}

	render() {
		return (
			<Paper square>
				{this.getChild()}
			</Paper>
		);
	}
}

ResultContainer.propTypes = {
	roomList: PropTypes.object.isRequired,
	selectedRoom: PropTypes.object.isRequired,
	onSelectRoom: PropTypes.func
};

export default ResultContainer;
