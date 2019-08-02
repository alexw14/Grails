import React from 'react';
import ShopCardBlock from '../utils/shopCardBlock';

const LoadMoreCards = (props) => {
  return (
    <div>
      <div>
        <ShopCardBlock 
          grid={props.grid}
          list={props.products}
        />
      </div>
    </div>
  );
};

export default LoadMoreCards;