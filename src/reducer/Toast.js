import { TOAST_SHOW, TOAST_CLOSE } from '../action'

const initialState = false

export default (state = initialState, action) => {
	switch(action.type) {
		case TOAST_SHOW:
			return true

		case TOAST_CLOSE:
			return false

		default:
			return state
	}
}
