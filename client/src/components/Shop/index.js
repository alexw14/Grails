import React, { Component } from 'react';
import PageTopSection from '../utils/pageTopSection';

import { connect } from 'react-redux';
import { getBrands, getCategories } from '../../actions/products_actions';

class Shop extends Component {

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getCategories());
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <PageTopSection
          title="Browse Products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              Left
            </div>
            <div className="right">
              Right
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop);