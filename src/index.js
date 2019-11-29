import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import { blue, teal } from '@material-ui/core/colors'
import { CssBaseline, Grid } from '@material-ui/core'
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

const styles = (theme) => ({
	gridWrapper: {
		padding: theme.spacing(11, 3, 3)
	},
	grid: {
		position: 'relative'
	}
})

let App = (props) => (
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar />
			<div className={props.classes.gridWrapper}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={4}>
						<SearchPanelContainer />
					</Grid>
					<Grid item xs={12} md={8} className={props.classes.grid}>
						<ResultContainer />
					</Grid>
				</Grid>
			</div>
			<SnackBarContainer />
		</MuiThemeProvider>
	</Provider>
)

App.propTypes = {
	classes: PropTypes.object.isRequired
}

App = withStyles(styles)(App)

document.addEventListener('DOMContentLoaded', ()=>{
	let containerDOM = document.getElementById('scheduleApp')
	containerDOM ? ReactDom.render(<App />, containerDOM) : false
})
