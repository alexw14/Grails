import React, { Component } from 'react';

import HomeSlider from './homeSlider';
import HomePromotion from './homePromotion';
import CardBlock from '../utils/cardBlock';

import { connect } from 'react-redux';
import { getProductsBySell, getProductsByArrival } from '../../actions/products_actions';

class Home extends Component {

  componentDidMount() {
    this.props.dispatch(getProductsBySell());
    this.props.dispatch(getProductsByArrival());
  }

  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.products.bySell}
          title='Best Selling Sneakers'
        />
        {/* <HomePromotion /> */}
        <CardBlock
          list={this.props.products.byArrival}
          title='New Arrivals'
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);