import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MarketOverviewPage } from "./MarketOverviewPage/MarketOverviewPage";
import { LiquidityPage } from "./LiquidityPage/LiquidityPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={MarketOverviewPage} />
          <Route exact path="/liquidity" component={LiquidityPage} />
        </div>
      </Router>
    );
  }
}

export default App;
