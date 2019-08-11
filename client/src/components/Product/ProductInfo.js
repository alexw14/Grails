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
    <div className="product_tags">
      {
        detail.shipping ?
          <div className="tag">
            <div><FontAwesomeIcon icon={faTruck} /></div>
            <div className="tag_text">
              <div>Free Shipping </div>
              <div>And Return </div>
            </div>
          </div>
          : null
      }
      {
        detail.available ?
          <div className="tag">
            <div><FontAwesomeIcon icon={faCheck} /></div>
            <div className="tag_text">
              <div>Available </div>
            </div>
          </div>
          :
          <div className="tag">
            <div><FontAwesomeIcon icon={faTimes} /></div>
            <div className="tag_text">
              <div>Not Available </div>
              <div>Pre-Order Only </div>
            </div>
          </div>
      }
    </div>
  )

  const showProductActions = (detail) => (
    <div className="product_actions">
      <div className="price">$ {detail.price}</div>
      <div className="cart">
        <MyButton
          type="add_to_cart_link"
          runAction={() => {
            props.addToCart(detail._id)
          }}
        />
      </div>
    </div>
  )

  const showProductMoreInfo = (detail) => (
    <div className="product_specifications">
      <h2>Additional Information</h2>
      <div>
        <div className="item">
          <strong>Colorway:</strong> {detail.colorway}
        </div>
        <div className="item">
          <strong>Release Date:</strong> {detail.releaseDate}
        </div>
      </div>
    </div>
  )

  const detail = props.productDetail;

  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>{detail.description}</p>
      {showProductTags(detail)}
      {showProductActions(detail)}
      {showProductMoreInfo(detail)}
    </div>
  );
};

export default ProductInfo;