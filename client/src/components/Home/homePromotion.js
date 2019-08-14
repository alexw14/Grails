import React from 'react';

import MyButton from '../utils/button';

const HomePromotion = (props) => {

  const promotion = {
    img: '/images/featured/yeezyboostbeluga2.jpg',
    lineOne: 'Just Dropped',
    lineTwo: 'Discover the latest',
    linkTitle: 'See All',
    linkTo: '/shop'
  }

  const showPromotion = () => (
    promotion ?
      <div className="home-promotion-img"
        style={{
          background: `url(${promotion.img})`,
          height: '500px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center'
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low-title">{promotion.lineTwo}</div>
        <div>
          <MyButton
            type="default"
            title={promotion.linkTitle}
            linkTo={promotion.linkTo}
            addStyles={{
              margin: '10px 0 0 0'
            }}
          />
        </div>
      </div>
      : null
  )

  return (
    <div className="home-promotion">
      {showPromotion()}
    </div>
  );
};

export default HomePromotion;