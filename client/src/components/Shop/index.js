import React, { Component } from 'react';
import PageTopSection from '../utils/pageTopSection';

import { connect } from 'react-redux';
import { getBrands, getCategories } from '../../actions/products_actions';

import CollapsibleCheckbox from '../utils/collapsibleCheckbox';

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      category: [],
      price: []
    }
  }

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getCategories());
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    this.setState({
      filters: newFilters
    });
  }

  render() {
    console.log(this.state.filters)
    const products = this.props.products;
    return (
      <div>
        <PageTopSection
          title="Browse Products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">

              <CollapsibleCheckbox
                initState={true}
                title='Brands'
                list={products.byBrands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapsibleCheckbox
                initState={false}
                title='Categories'
                list={products.byCategories}
                handleFilters={(filters) => this.handleFilters(filters, 'category')}
              />


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