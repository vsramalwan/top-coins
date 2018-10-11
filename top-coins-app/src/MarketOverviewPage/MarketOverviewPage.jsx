import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { dataAction } from './../_actions/data.actions';

import Header from './../Wrapper/Header/Header';
import Footer from './../Wrapper/Footer/Footer';

class MarketOverviewPage extends Component {
  constructor (props) {
		super(props);

		this.state = {
      // tableData: [],
      pageSize: 10,
		};
  }
  
  handlePageSizeChange = (pageSize, pageIndex) => {
    this.setState({
      pageSize: pageSize
    });
    console.log('page size value: ', pageSize);
  }
  
  render() {
    const { topCoinsData, loadData } = this.props;
    return (
      <div>
        <Header />
        <br />
        <br />
        <br />
        <br />
        <ReactTable
          data={ topCoinsData }
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
          pageSizeOptions={[10, 50, 100]}
          pageSize={this.state.pageSize}
          onPageSizeChange={this.handlePageSizeChange}
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

const mapStateToProps = (state) => {
	return {
    topCoinsData: state.dataReducer.data,
  };
};

export default connect(mapStateToProps, {
  loadData: dataAction,
})(MarketOverviewPage);