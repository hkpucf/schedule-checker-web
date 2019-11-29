import { ROOM_SEARCHED, TIMETABLE_FETCHING, TIMETABLE_FETCHED, TIMETABLE_CLEAR } from '../action'

const initialState = {
	fetching: false,
	room: null,
	timetable: []
}

export default (state = initialState, action) => {
	switch(action.type) {
		case ROOM_SEARCHED:
			return initialState

		case TIMETABLE_FETCHING:
			return Object.assign({}, state, {
				fetching: true,
				room: action.room
			})

		case TIMETABLE_FETCHED:
			return Object.assign({}, state, {
				fetching: false,
				timetable: action.timetable
			})

		case TIMETABLE_CLEAR:
			return initialState

		default:
			return state
	}
}
