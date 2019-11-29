import { ROOM_SEARCHING, ROOM_SEARCHED } from '../action'

const initialState = {
	fetching: false,
	fetchedList: [],
	fetchedDate: ''
}

export default (state = initialState, action) => {
	switch(action.type) {
		case ROOM_SEARCHING:
			return Object.assign({}, state, {
				fetching: true
			})

		case ROOM_SEARCHED:
			return Object.assign({}, state, {
				fetching: false,
				fetchedList: action.roomList || [],
				fetchedDate: action.roomList ? action.date : ''
			})

		default:
			return state
	}
}
