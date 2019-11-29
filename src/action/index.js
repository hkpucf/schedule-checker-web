import Axios from 'axios'

export const TOAST_SHOW = 'TOAST_SHOW'
export const TOAST_CLOSE = 'TOAST_CLOSE'
export const ROOM_SEARCHING = 'ROOM_SEARCHING'
export const ROOM_SEARCHED = 'ROOM_SEARCHED'
export const TIMETABLE_FETCHING = 'TIMETABLE_FETCHING'
export const TIMETABLE_FETCHED = 'TIMETABLE_FETCHED'
export const TIMETABLE_CLEAR = 'TIMETABLE_CLEAR'

export const showToast = () => ({
	type: TOAST_SHOW
})

export const closeToast = () => ({
	type: TOAST_CLOSE
})

const searchingRoom = () => ({
	type: ROOM_SEARCHING
})

const searchedRoom = (date, roomList) => ({
	type: ROOM_SEARCHED,
	date: date,
	roomList: roomList
})

export const searchRoom = (date, start, end) => (dispatch) => {
	dispatch(searchingRoom())

	let params = date.split('-')
	start = start.replace(':', '')
	end = end.replace(':', '')
	Axios.get(
		process.env.HOST + '/' + params[0] + '/' + params[1] + '/' + params[2] + '/' + start + '/' + end,
		{
			responseType: 'json'
		}
	).then((res) => {
		dispatch(searchedRoom(date, res.data))
	})
}

const fetchingTimetable = (room) => ({
	type: TIMETABLE_FETCHING,
	room: room
})

const fetchedTimetable = (timetable) => ({
	type: TIMETABLE_FETCHED,
	timetable: timetable
})

export const fetchTimetable = (date, room) => (dispatch) => {
	dispatch(fetchingTimetable(room))

	let params = date.split('-')
	Axios.get(
		process.env.HOST + '/' + params[0] + '/' + params[1] + '/' + params[2] + '/' + room,
		{
			responseType: 'json'
		}
	).then((res) => {
		dispatch(fetchedTimetable(res.data))
	})
}

export const clearTimetable = () => (dispatch) => {
	dispatch({
		type: TIMETABLE_CLEAR
	})
	return Promise.resolve()
}
