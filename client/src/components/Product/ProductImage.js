import React, { Component } from 'react';

class ProductImage extends Component {

  state = {
    lightbox: false,
    imagePos: 0,
    lightboxImages: []
  }

  componentDidMount() {
    if (this.props.productDetail.images.length > 0) {
      let lightboxImages = [];
      this.props.productDetail.images.forEach((img) => {
        lightboxImages.push(img.url)
      });
      this.setState({
        lightboxImages
      });
    }
  }

  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return `/images/image_not_available.png`;
    }
  }

  handleLightbox = (position) => {

  }

  showThumbnailImages = () => (
    this.state.lightboxImages.map((img, i) => (
      i > 0 ?
        <div
          key={i}
          className="thumb"
          style={{background: `url(${img}) no-repeat`}}
          onClick={() => this.handleLightbox(i)}
        >
        </div>
        : null
    ))
  )

  render() {
    const { productDetail } = this.props;
    return (
      <div className="product_image_container">
        <div className="main_pic">
          <div
            style={{ background: `url(${this.renderCardImage(productDetail.images)}) no-repeat` }}
            onClick={() => this.handleLightbox(0)}
          >
          </div>
        </div>
        <div className="main_thumbs">
          {this.showThumbnailImages()}
        </div>
      </div>
    );
  }
}

export default ProductImage;