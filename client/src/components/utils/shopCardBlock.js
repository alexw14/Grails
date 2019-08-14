import React from 'react';
import Card from '../utils/card';

const ShopCardBlock = (props) => {

  const renderCards = () => (
    props.list ?
      props.list.map((card) => (
        <Card
          key={card._id}
          {...card}
          grid={props.grid}
        />
      ))
      : null
  )

  return (
    <div className="card-block-shop">
      <div className="card-block-shop-container">
        {
          props.list ?
            props.list.length === 0 ?
              <div className="no-result">Sorry, no results</div>
              : null
            : null
        }
        {renderCards(props.list)}
      </div>
    </div>
  );
};

export default ShopCardBlock;