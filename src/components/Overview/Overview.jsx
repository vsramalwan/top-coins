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
      pageSize: this.props.topCoinsData.length>0?this.props.topCoinsData.length:10,
      pageIndex: 0,
		};
  }

  componentDidMount() {
    const { loadData } = this.props;
    return loadData(this.state.pageIndex, this.state.pageSize);
  }
  
  handlePageSizeChange = (pageSize, pageIndex) => {
    console.log("pageSize", pageSize);
    this.setState({
      pageSize: pageSize,
      pageIndex: pageIndex,
    });
    const { loadData } = this.props;
    return loadData(pageIndex, pageSize);
  }
  
  handlePageChange = (pageIndex, pageSize) => {
    console.log("pageIndex", pageIndex);
    this.setState({
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
    const { loadData } = this.props;
    return loadData(pageIndex, pageSize);
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
        {/* <br />
        <br />
        <br />
        <br /> */}
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
          onPageChange={this.handlePageChange}
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

const mapDispatchToProps = (dispatch) => ({
  loadData: (start, limit) => dispatch(getTopCoinsData(start, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Overview);