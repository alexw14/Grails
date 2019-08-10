import React from 'react';
import MyButton from '../utils/button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck,
  faCheck,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const ProductInfo = (props) => {

  const detail = props.productDetail;

  return (
    <div>
      <h1>{detail.brand.name} {detail.name}</h1>
      <p>{detail.description}</p>
    </div>
  );
};

export default ProductInfo;