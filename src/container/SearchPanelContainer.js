import React, {
	memo,
	useCallback,
	useState
} from 'react'
import { useDispatch } from 'react-redux'
import { searchRoom } from '../action'
import SearchPanel from '../component/SearchPanel.js'

const SearchPanelContainer = memo((props) => {
	const dispatch = useDispatch()
	const now = new Date()
	const [date, setDate] = useState(now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2))
	const [dateErr, setDateErr] = useState(null)

	let startTime = '08:30'
	if((now.getHours() * 100 + now.getMinutes()) > 830 && (now.getHours() * 100 + now.getMinutes()) < 2200) {
		startTime = ('0' + now.getHours()).slice(-2) + ':' + ((now.getMinutes() < 30) ? '00' : '30')
	}
	const [start, setStart] = useState(startTime)
	const [startErr, setStartErr] = useState(null)
	const [end, setEnd] = useState('22:00')
	const [endErr, setEndErr] = useState(null)

	const onChangeDate = useCallback((dateStr) => {
		if(dateStr == null || dateStr.length == 0)
			setDateErr('Date is required')
		else {
			setDate(dateStr)
			setDateErr(null)
		}
	})

	const onChangeStart = useCallback((startStr) => {
		if(startStr == null || startStr.length == 0) {
			setStartErr('Start time is required')
			return
		}

		const timeVal = parseInt(startStr.slice(0, 2) + startStr.slice(-2))
		if(timeVal < 830 || timeVal > 2130)
			setStartErr('Time must be between 08:30 - 21:30')
		else {
			setStart(startStr)
			setStartErr(null)
		}
	})

	const onChangeEnd = useCallback((endStr) => {
		if(endStr == null || endStr.length == 0) {
			setEndErr('End time is required')
			return
		}

		const timeVal = parseInt(endStr.slice(0, 2) + endStr.slice(-2))
		if(timeVal < 900 || timeVal > 2200)
			setEndErr('Time must be between 09:00 - 22:00')
		else {
			setEnd(endStr)
			setEndErr(null)
		}
	})

	const onSubmit = useCallback((e) => {
		e.preventDefault()

		if(dateErr != null || startErr != null || endErr != null)
			return

		dispatch(searchRoom(date, start, end))
	})

	return (
		<SearchPanel
			date={date}
			dateErr={dateErr}
			start={start}
			startErr={startErr}
			end={end}
			endErr={endErr}
			onChangeDate={onChangeDate}
			onChangeStart={onChangeStart}
			onChangeEnd={onChangeEnd}
			onSubmit={onSubmit} />
	)
})

export default SearchPanelContainer
