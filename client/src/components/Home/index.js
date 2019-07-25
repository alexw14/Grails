import React, { Component } from 'react';

import HomeSlider from './homeSlider';
import HomePromotion from './homePromotion';

class Home extends Component {
  render() {
    return (
      <div>
        <HomeSlider />
        <HomePromotion />
      </div>
    );
  }
}

export default Home;