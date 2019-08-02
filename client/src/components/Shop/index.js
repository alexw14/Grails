import React, { Component } from 'react';
import PageTopSection from '../utils/pageTopSection';

import { connect } from 'react-redux';
import { getBrands, getCategories } from '../../actions/products_actions';
import { price } from '../utils/Form/fixed_categories';
import CollapsibleCheckbox from '../utils/collapsibleCheckbox';
import CollapsibleRadio from '../utils/collapsibleRadio';

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

  handlePrice = (value) => {
    const data = price;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  }

  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;
    if (category === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }
    this.setState({
      filters: newFilters
    });
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
              <CollapsibleRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, 'price')}
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