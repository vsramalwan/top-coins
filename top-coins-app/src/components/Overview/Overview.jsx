import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { getTopCoinsData } from './../../actions/data.actions';

import Header from './../Wrapper/Header/Header';
import Footer from './../Wrapper/Footer/Footer';

class Overview extends Component {
  constructor (props) {
		super(props);

		this.state = {
      pageSize: 10,
		};
  }

  componentDidMount() {
    const { loadData } = this.props;
    return loadData();
  }
  
  handlePageSizeChange = (pageSize, pageIndex) => {
    this.setState({
      pageSize: pageSize
    });
  }
  
  render() {
    const { loading, topCoinsData, error } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
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
          pageSizeOptions={[10, 50, topCoinsData.length]}
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
    topCoinsData: state.dataReducer.items,
    loading: state.dataReducer.loading,
    error: state.dataReducer.error,
  };
};

export default connect(mapStateToProps, {
  loadData: getTopCoinsData,
})(Overview);