import React, { Component } from 'react';
import axios from 'axios';
import ReactTable from "react-table";
import 'react-table/react-table.css'

import Header from './../Wrapper/Header/Header';
import Footer from './../Wrapper/Footer/Footer';

export class MarketOverviewPage extends Component {
  constructor () {
		super();

		this.state = {
			tableData: [{
				name: '',
				symbol: '',
				rank: '',
			}],
		};
  }
  componentDidMount () {
    axios.get('https://api.coinmarketcap.com/v2/ticker/?sort=rank', {
      responseType: 'json'
    }).then(response => {
      for (var prop in response.data['data']) { this.state.tableData.push(response.data['data'][prop]);}
    });
  }
  
  render() {
    return (
      <div>
        <Header />
        <br />
        <br />
        <br />
        <br />
        This is the market overview page!
        <Footer />
      </div>
    )
  }
}

export default MarketOverviewPage
