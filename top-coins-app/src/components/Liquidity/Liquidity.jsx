import React, { Component } from 'react';
import { ScatterplotChart } from 'react-easy-chart';
import ToolTip from "./../../assets/js/ToolTip";
import { connect } from 'react-redux';
import { getTopCoinsData } from './../../actions/data.actions';

import Header from './../Wrapper/Header/Header';
import Footer from './../Wrapper/Footer/Footer';
export class Liquidity extends Component {
  constructor (props) {
		super(props);

		this.state = {
      showToolTip: true,
      top: 0,
      left: 0,
      y: 0,
      x: 0,
      z: 0,
      type: '',
      windowWidth: 400,
      componentWidth: 1000,
    };
    
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    const { loadData } = this.props;
    return loadData(0, this.props.topCoinsData.length);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth - 100,
      componentWidth: this.refs.component.offsetWidth
    });
  }
  
  mouseOverHandler = (d, e) => {
    this.setState({
      showToolTip: true,
      top: `${e.screenY - 10}px`,
      left: `${e.screenX + 10}px`,
      y: d.y,
      x: d.x,
      z: d.z,
      type: d.type,
    });
  }
  
  mouseOutHandler = () => {
    this.setState({showToolTip: false});
  }

  createTooltip() {
    if (this.state.showToolTip) {
      return (
        <ToolTip
          top={this.state.top}
          left={this.state.left}
        >
          Name: {this.state.type},
          Market cap: {this.state.x},
          Volume: {this.state.y},
          Price Change: {this.state.z}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    const { loading, topCoinsData, error } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    let data = [];
    topCoinsData.forEach(function (item) {
      data.push({
        type: item.name, 
        x: item.quotes.USD.market_cap, 
        y: item.quotes.USD.volume_24h, 
        z: item.quotes.USD.percent_change_24h
      });
    })
    
    return (
      <div>
        <Header />
        <br />
        <br />
        <br />
        <br />
        <div ref="component">
          <ScatterplotChart
            data={data}
            width={this.state.componentWidth / 1.5}
            height={this.state.componentWidth / 3}
            axes
            yAxisOrientLeft
            xType='linear'
            yType='linear'
            // xDomainRange={[0, dataSize]}
            axisLabels={{x: 'Market Cap', y: 'Volume'}}
            margin={{top: 10, right: 10, bottom: 30, left: 100}}
            mouseOverHandler={this.mouseOverHandler}
            mouseOutHandler={this.mouseOutHandler}
          />
          {this.createTooltip()}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Liquidity);