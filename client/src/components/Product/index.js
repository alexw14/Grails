import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTopSection from '../utils/pageTopSection'
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';
import { addToCart } from '../../actions/user_actions';
import ProductInfo from './ProductInfo';
import ProductImage from './ProductImage';

class ProductDetail extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  handleAddToCart = (id) => {
    this.props.dispatch(addToCart(id));
  }

  showProduct = () => {
    if (this.props.products.productDetail) {
      return (
        <div className="product_detail_wrapper">
          <div className="left">
            <div style={{ width: '500px' }}>
              <ProductImage
                productDetail={this.props.products.productDetail}
              />
            </div>
          </div>
          <div className="right">
            <ProductInfo
              productDetail={this.props.products.productDetail}
              addToCart={(id) => this.handleAddToCart(id)}
            />
          </div>
        </div>
      )
    } else {
      return (
        <h1 style={{ textAlign: 'center' }}>Sneaker Not Found</h1>
      )
    }
  }

  render() {
    return (
      <div>
        <PageTopSection title='Product Detail' />
        <div className="container">
          {this.showProduct()}
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

export default connect(mapStateToProps)(ProductDetail);