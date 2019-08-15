import React from 'react';

const UserProductBlock = (props) => {

  const renderCartImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_available.png';
    }
  }

  const renderItems = () => (
    props.products.cartDetail ?
      props.products.cartDetail.map(item => (
        <div className="user-product-block" key={item._id}>
          <div className="item thumb">
            <div
              className="image"
              style={{ background: `url(${renderCartImage(item.images)}) no-repeat` }}
            ></div>
          </div>
          <div className="item product">
            <div>Product name</div>
            <div>{item.brand.name} {item.name}</div>
          </div>
          <div className="item quantity">
            <div>Quantity</div>
            <div>{item.quantity}</div>
          </div>
          <div className="item price">
            <div>Price</div>
            <div>$ {item.price}</div>
          </div>
          <div className="item cart-remove-btn">
            <button
              className="btn-small red waves-effect waves-light"
              onClick={() => props.removeItem(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))
      : null
  )

  return (
    <div>
      {renderItems()}
    </div>
  );
};

export default UserProductBlock;