import React, { Component } from 'react';
import logo from './logo.jpg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { MarketOverviewPage } from "./MarketOverviewPage/MarketOverviewPage";
import { LiquidityPage } from "./LiquidityPage/LiquidityPage";

const MainMenu = () => {
return (
<div>
  <Link to="/">
    <a>Market Overview&nbsp;&nbsp;</a>
  </Link>
  <Link to="/liquidity">
    <a>&nbsp;&nbsp;Liquidity</a>
  </Link>
</div>
);
};

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <MainMenu />
          <div>
            <Route exact path="/" component={MarketOverviewPage} />
            <Route exact path="/liquidity" component={LiquidityPage} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
