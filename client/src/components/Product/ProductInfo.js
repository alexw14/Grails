import React from 'react';
import MyButton from '../utils/button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const ProductInfo = (props) => {

  const showProductTags = (detail) => (
    <div className="product-tags">
      {
        detail.shipping ?
          <div className="tag">
            <div><FontAwesomeIcon icon={faTruck} /></div>
            <div className="tag-text">
              <div>Free Shipping </div>
            </div>
          </div>
          : null
      }
      {
        detail.available ?
          <div className="tag">
            <div><FontAwesomeIcon icon={faCheck} /></div>
            <div className="tag-text">
              <div>Available </div>
            </div>
          </div>
          :
          <div className="tag">
            <div><FontAwesomeIcon icon={faTimes} /></div>
            <div className="tag-text">
              <div>Not Available </div>
              <div>Pre-Order Only </div>
            </div>
          </div>
      }
    </div>
  )

  const showProductActions = (detail) => (
    <div className="product-actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <MyButton
          type="add-to-cart-link"
          runAction={() => {
            props.addToCart(detail._id)
          }}
        />
      </div>
    </div>
  )

  const detail = props.productDetail;

  return (
    <div className="product-info-container">
      <div className="product-info-brand-title">{detail.brand.name}</div>
      <div className="product-info-title">{detail.name}</div>
      <p>{detail.description}</p>
      <div><strong>Colorway:</strong> {detail.colorway}</div>
      <div><strong>Release Date:</strong> {detail.releaseDate}</div>
      <div><strong>Category:</strong> {detail.category.name}</div>
      {showProductTags(detail)}
      {showProductActions(detail)}
    </div>
  );
};

export default ProductInfo;