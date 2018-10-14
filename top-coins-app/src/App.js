import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MarketOverviewPage from "./MarketOverviewPage/MarketOverviewPage";
import { LiquidityPage } from "./LiquidityPage/LiquidityPage";
import { Provider } from 'react-redux';
import AppReducer from './_reducers/app.reducer';
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
            <Route exact path="/" component={MarketOverviewPage} />
            <Route exact path="/liquidity" component={LiquidityPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
