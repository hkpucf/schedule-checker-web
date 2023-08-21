import React, {
	useEffect
} from 'react'
import ReactDom from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { blue, teal } from '@material-ui/core/colors'
import { CssBaseline, Grid } from '@material-ui/core'
import { Search as SearchIcon } from '@material-ui/icons'
import AppBar from './container/AppBarContainer.js'
import SearchPanelContainer from './container/SearchPanelContainer.js'
import ResultContainer from './container/ResultContainer.js'
import SnackBarContainer from './container/SnackBarContainer.js'
import reducers from './reducer'

const store = createStore(
	reducers,
	applyMiddleware(
		thunkMiddleware
	)
)

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: teal,
	},
	typography: {
		useNextVariants: true
	}
})

const useStyles = makeStyles((theme) => ({
	gridWrapper: {
		marginTop: theme.spacing(8),
		height: 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		overflowY: 'auto'
	},
	grid: {
		position: 'relative'
	}
}))

let App = (props) => {
	const classes = useStyles()

	useEffect(() => {
		const svg = renderToString(<SearchIcon width='16' height='16' xmlns='http://www.w3.org/2000/svg' />)
		const blob = new Blob([svg], {type: 'image/svg+xml'})
		const url = URL.createObjectURL(blob)

		const link = document.querySelector('link[rel*=\'icon\']') || document.createElement('link')
		link.type = 'image/svg+xml'
		link.rel = 'icon'
		link.href = url
		document.getElementsByTagName('head')[0].appendChild(link)

		return () => {
			URL.revokeObjectURL(url)
		}
	}, [])

	return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<AppBar />
				<div className={classes.gridWrapper}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={4}>
							<SearchPanelContainer />
						</Grid>
						<Grid item xs={12} md={8} className={classes.grid}>
							<ResultContainer />
						</Grid>
					</Grid>
				</div>
				<SnackBarContainer />
			</MuiThemeProvider>
		</Provider>
	)
}

document.addEventListener('DOMContentLoaded', ()=>{
	let containerDOM = document.getElementById('scheduleApp')
	containerDOM ? ReactDom.render(<App />, containerDOM) : false
})
