import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTopSection from '../utils/pageTopSection'
import { getProductDetail, clearProductDetail } from '../../actions/products_actions';
import ProductInfo from './ProductInfo';

class ProductDetail extends Component {

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getProductDetail(id));
  }

  componentWillUnmount() {
    this.props.dispatch(clearProductDetail());
  }

  render() {
    return (
      <div>
        <PageTopSection title='Product Detail' />
        <div className="container">
          {
            this.props.products.productDetail ?
              <div className="product_detail_wrapper">
                <div className="left">
                  Images
                </div>
                <div className="right">
                  <ProductInfo
                    productDetail={this.props.products.productDetail}
                    addToCart={(id) => this.handleAddToCart(id)}
                  />
                </div>
              </div>
              : 'Loading'
          }
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