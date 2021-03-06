import React, { Component } from 'react';
import PageTopSection from '../utils/pageTopSection';
import LoadMoreCards from './loadMoreCards';

import { connect } from 'react-redux';
import { getBrands, getCategories, getProductsToShop } from '../../actions/products_actions';
import { price } from '../utils/Form/fixed_categories';
import CollapsibleCheckbox from '../utils/collapsibleCheckbox';
import CollapsibleRadio from '../utils/collapsibleRadio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from '@fortawesome/fontawesome-free-solid/faTh';

class Shop extends Component {

  state = {
    grid: '',
    skip: 0,
    limit: 6,
    filters: {
      brand: [],
      category: [],
      price: []
    }
  }

  componentDidMount() {
    this.props.dispatch(getBrands());
    this.props.dispatch(getCategories());
    this.props.dispatch(getProductsToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    ));
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
    this.showFilteredResult(newFilters);
    this.setState({
      filters: newFilters
    });
  }

  showFilteredResult = (filters) => {
    this.props.dispatch(getProductsToShop(
      0,
      this.state.limit,
      filters
    )).then(() => {
      this.setState({
        skip: 0
      })
    });
  }

  loadMoreCards = () => {
    let skip = this.state.skip + this.state.limit;
    this.props.dispatch(getProductsToShop(
      skip,
      this.state.limit,
      this.state.filters,
      this.props.products.toShop
    )).then(() => {
      this.setState({
        skip
      })
    })
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid-bars' : ''
    })
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <PageTopSection
          title="Browse Sneakers"
        />
        <div className="container">
          <div className="shop-wrapper">
            <div className="left-section">
              <CollapsibleCheckbox
                initState={false}
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
            <div className="right-section">
              <div className="shop-options">
                <div className="shop-grids clear">
                  <div
                    className={`grid-btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faTh} />
                  </div>
                  <div
                    className={`grid-btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                </div>
              </div>
              <div>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMoreCards()}
                />
              </div>
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