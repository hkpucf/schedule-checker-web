import React, {
	memo,
	useCallback,
	useRef
} from 'react'
import {
	useDispatch,
	useSelector
} from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { animateScroll as Scroll, Events as ScrollEvents } from 'react-scroll'
import { fetchTimetable, clearTimetable } from '../action'
import ProgressBar from '../component/ProgressBar.js'
import { RoomList, EmptyList } from '../component/RoomList.js'
import Timetable from '../component/Timetable.js'

const ResultContainer = memo((props) => {
	const dispatch = useDispatch()
	const roomList = useSelector(state => state.roomList)
	const selectedRoom = useSelector(state => state.selectedRoom)
	const lastScrollTop = useRef(-1)

	const onSelectRoom = useCallback((room) => {
		lastScrollTop.current = window.scrollY
		ScrollEvents.scrollEvent.register('end', () => {
			dispatch(fetchTimetable(roomList.fetchedDate, room))
			ScrollEvents.scrollEvent.remove('end')
		})
		Scroll.scrollToTop({
			smooth: 'easeInOutQuad',
			duration: 500
		})
	})

	const onBack = useCallback(() => {
		dispatch(clearTimetable()).then(() => {
			Scroll.scrollTo(lastScrollTop.current, {
				smooth: 'easeInOutQuad',
				duration: 500
			})
			lastScrollTop.current = -1
		})
	})

	const Child = () => {
		if(roomList.fetchedList.length < 1) {
			return <EmptyList />
		}
		if(selectedRoom.room != null) {
			return <Timetable fetching={selectedRoom.fetching} room={selectedRoom.room} timetable={selectedRoom.timetable} onBack={onBack} />
		} else {
			return <RoomList list={roomList.fetchedList} date={roomList.fetchedDate} onSelectRoom={onSelectRoom} />
		}
	}

	return (
		<div>
			{
				(roomList.fetching || selectedRoom.fetching) ? <ProgressBar /> : null
			}
			<Paper square>
				<Child />
			</Paper>
		</div>
	)
})

export default ResultContainer
