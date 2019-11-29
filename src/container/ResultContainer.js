import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Paper from '@material-ui/core/Paper'
import { animateScroll as Scroll, Events as ScrollEvents } from 'react-scroll'
import { fetchTimetable, clearTimetable } from '../action'
import ProgressBar from '../component/ProgressBar.js'
import { RoomList, EmptyList } from '../component/RoomList.js'
import Timetable from '../component/Timetable.js'

class ResultContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lastScrollTop: -1
		}

		this.getChild.bind(this)
	}

	componentWillUnmount() {
		ScrollEvents.scrollEvent.remove('end')
	}

	onSelectRoom(room) {
		this.setState({
			lastScrollTop: window.scrollY
		})
		ScrollEvents.scrollEvent.register('end', () => {
			this.props.onSelectRoom(this.props.roomList.fetchedDate, room)
			ScrollEvents.scrollEvent.remove('end')
		})
		Scroll.scrollToTop({
			smooth: 'easeInOutQuad',
			duration: 500
		})
	}

	onBack() {
		let lastScrollTop = this.state.lastScrollTop
		this.props.onClearRoom().then(() => {
			this.setState({
				lastScrollTop: -1
			}, () => {
				Scroll.scrollTo(lastScrollTop, {
					smooth: 'easeInOutQuad',
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
			return <Timetable fetching={this.props.selectedRoom.fetching} room={this.props.selectedRoom.room} timetable={this.props.selectedRoom.timetable} onBack={this.onBack.bind(this)} />
		} else {
			return <RoomList list={this.props.roomList.fetchedList} date={this.props.roomList.fetchedDate} onSelectRoom={this.onSelectRoom.bind(this)} />
		}
	}

	render() {
		return (
			<div>
				{
					(this.props.roomList.fetching || this.props.selectedRoom.fetching) ? <ProgressBar /> : null
				}
				<Paper square>
					{this.getChild()}
				</Paper>
			</div>
		)
	}
}

ResultContainer.propTypes = {
	roomList: PropTypes.object.isRequired,
	selectedRoom: PropTypes.object.isRequired,
	onSelectRoom: PropTypes.func.isRequired,
	onClearRoom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
	roomList: state.roomList,
	selectedRoom: state.selectedRoom
})

const mapDispatchToProps = (dispatch) => ({
	onSelectRoom: (date, room) => {
		dispatch(fetchTimetable(date, room))
	},
	onClearRoom: () => {
		return dispatch(clearTimetable())
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ResultContainer)
