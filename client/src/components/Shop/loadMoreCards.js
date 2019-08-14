import React from 'react';
import ShopCardBlock from '../utils/shopCardBlock';

const LoadMoreCards = (props) => {
  return (
    <div>
      <div className="card-block-shop-wrapper">
        <ShopCardBlock
          grid={props.grid}
          list={props.products}
        />
      </div>
      {
        props.size > 0 && props.size >= props.limit ?
          <div className="load-more-container">
            <span onClick={() => props.loadMore()}>
              Load More
            </span>
          </div>
          : null
      }
    </div>
  );
};

export default LoadMoreCards;