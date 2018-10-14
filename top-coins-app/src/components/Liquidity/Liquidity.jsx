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
      windowWidth: 400,
      componentWidth: 1000,
    };
    
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();

    const { loadData } = this.props;
    return loadData();
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
      x: d.x
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
            The x value is {this.state.x} and the y value is {this.state.y}
        </ToolTip>
      );
    }
    return false;
  }

  render() {
    const { loading, topCoinsData, error } = this.props;
    // console.log("topCoinsData", topCoinsData);
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }
    const data = [
      {
        // // type: 'One',
        x: 1,
        y: 5,
        z: 500
      },
      {
        // // type: 'Two',
        x: 3,
        y: 1,
        z: 100
      },
      {
        // // type: 'Three',
        x: 0,
        y: 6,
        z: 600
      },
      {
        // // type: 'Four',
        x: 5,
        y: 2,
        z: 200
      },
      {
        // type: 'Five',
        x: 4,
        y: 4,
        z: 400
      },
      {
        // type: 'Six',
        x: 5,
        y: 9,
        z: 900
      },
      {
        // type: 'Seven',
        x: 9,
        y: 1,
        z: 100
      },
      {
        // type: 'Eight',
        x: 5,
        y: 6,
        z: 600
      },
      {
        // type: 'Nine',
        x: 3,
        y: 9,
        z: 900
      },
      {
        // type: 'Ten',
        x: 7,
        y: 9,
        z: 900
      }
    ];
    
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
            width={this.state.componentWidth/2}
            height={this.state.componentWidth / 4}
            axes={(this.state.componentWidth) > 400}
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

export default connect(mapStateToProps, {
  loadData: getTopCoinsData,
})(Liquidity);