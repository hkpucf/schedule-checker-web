import { combineReducers } from 'redux'
import roomList from './RoomList.js'
import selectedRoom from './RoomDetail.js'
import showToast from './Toast.js'

export default combineReducers({
	roomList,
	selectedRoom,
	showToast
})
