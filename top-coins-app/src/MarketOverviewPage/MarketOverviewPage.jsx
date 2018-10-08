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
      tableData: [],
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
              Header: 'Details',
              columns: [
                {
                  Header: 'Rank',
                  accessor: 'rank',
                },
                {
                  Header: 'Name',
                  accessor: 'name',
                }
              ]
            },
            {
              Header: 'Quotes',
              columns: [
                {
                  Header: 'Price',
                  id: 'price',
                  accessor: 'quotes.USD.price',
                  Cell: row => {
                    return (
                      <div>
                        <span>${parseFloat(row.row.price.toFixed(2)).toLocaleString()}</span>
                      </div>
                    )
                  }
                },
                {
                  Header: 'Price Change (24h)',
                  id: 'priceChange',
                  accessor: 'quotes.USD.percent_change_24h',
                  Cell: row => {
                    return (
                      <div>
                        <span>{row.row.priceChange}%</span>
                      </div>
                    )
                  }
                },
                {
                  Header: 'Market Cap',
                  id: 'marketCap',
                  accessor: 'quotes.USD.market_cap',
                  Cell: row => {
                    return (
                      <div>
                        <span>${row.row.marketCap.toLocaleString()}</span>
                      </div>
                    )
                  }
                },
                {
                  Header: 'Volume (24h)',
                  id: 'volume',
                  accessor: 'quotes.USD.volume_24h',
                  Cell: row => {
                    return (
                      <div>
                        <span>${parseFloat(row.row.volume.toFixed(0)).toLocaleString()}</span>
                      </div>
                    )
                  }
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
