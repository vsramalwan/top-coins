import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Overview from "./components/Overview/Overview";
import Liquidity from "./components/Liquidity/Liquidity";
import { Provider } from 'react-redux';
import AppReducer from './reducers/app.reducer';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

class App extends Component {
  constructor(props) {
		super(props);

		this.store = createStore(
			AppReducer,
			applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
			),
		);
	}
  render() {
    return (
      <Provider store={ this.store }>
        <Router>
          <div className="App">
            <Route exact path="/" component={Overview} />
            <Route exact path="/liquidity" component={Liquidity} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
