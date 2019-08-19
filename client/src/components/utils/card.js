import React, { Component } from 'react';
import MyButton from './button';
import { connect } from 'react-redux';

class Card extends Component {

  renderCardImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png'
    }
  }

  render() {
    const props = this.props;
    return (
      <div className={`card-item-wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.renderCardImage(props.images)}) no-repeat`
          }}
        ></div>
        <div className="action-container">
          <div className="tags">
            <div className="brand">{props.brand.name}</div>
            <div className="name">{props.name}</div>
            <div className="price">${props.price}</div>
          </div>
          {
            props.grid ?
              <div className="description">
                <p>{props.description}</p>
              </div>
              : null
          }
          <div className="actions">
            <div className="button-wrapper">
              <MyButton
                type="default"
                altClass="card-link"
                title="View Sneaker"
                linkTo={`/sneaker/${props._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Card);