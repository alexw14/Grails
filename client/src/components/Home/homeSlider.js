import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/button';

const HomeSlider = (props) => {

  const slides = [
    {
      img: '/images/featured/featured_bred1.jpg',
      lineOne: 'Nike',
      lineTwo: 'Air Jordan 1',
      linkTitle: 'Shop Now',
      linkTo: '/shop'
    }
    // {
    //   img: '/images/featured/featured_home_2.jpg',
    //   lineOne: 'Adidas',
    //   lineTwo: 'Yeezy Boost',
    //   linkTitle: 'View',
    //   linkTo: '/shop'
    // }
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  const generateSlides = () => (
    slides ?
      slides.map((item, idx) => (
        <div key={idx}>
          <div className="featured-image"
            style={{
              background: `url(${item.img})`,
              height: '720px',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center'
            }}
          >
            <div className="featured-action">
              <div className="tag title">{item.lineOne}</div>
              <div className="tag low-title">{item.lineTwo}</div>
            </div>
            <div className="featured-action-btn">
              <MyButton
                type="default"
                title={item.linkTitle}
                linkTo={item.linkTo}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
          </div>
        </div>
      ))
      : null
  )


  return (
    <div className="featured-container">
      <Slider {...settings}>
        {generateSlides()}
      </Slider>
    </div>
  );
};

export default HomeSlider;