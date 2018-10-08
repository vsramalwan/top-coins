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
      this.setState({ tableData: this.state.tableData });
      console.log(this.state.tableData);
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
        <ReactTable
          data={this.state.tableData}
          columns={[
            {
              Header: 'Market Overview',
              columns: [
                {
                  Header: 'Rank',
                  accessor: 'rank',
                },
                {
                  Header: 'Name',
                  accessor: 'name',
                },
                {
                  Header: 'Price',
                  accessor: 'quotes.USD.price',
                },
                {
                  Header: 'Price Change (24h)',
                  accessor: 'quotes.USD.percent_change_24h',
                },
                {
                  Header: 'Market Cap',
                  accessor: 'quotes.USD.market_cap',
                },
                {
                  Header: 'Volume (24h)',
                  accessor: 'quotes.USD.volume_24h',
                },
              ],
            },
          ]}
          defaultPageSize={10}
          pageSizeOptions={[10, 50, 100]}
          className="-striped -highlight"
          sorted={[{ // the sorting model for the table
            id: 'rank',
            asc: true
          }]}
        />
        <Footer />
      </div>
    )
  }
}

export default MarketOverviewPage
