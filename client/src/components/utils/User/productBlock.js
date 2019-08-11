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
    props.products.cartDetails ?
      props.products.cartDetails.map(item => (
        <div className="user_product_block" key={item._id}>
          <div className="item">
            <div
              className="image"
              style={{ background: `url(${renderCartImage(item.images)}) no-repeat` }}
            ></div>
          </div>
          <div className="item">
            <h4>Product name</h4>
            <div>{item.brand.name} {item.name}</div>
          </div>
          <div className="item">
            <h4>Quantity</h4>
            <div>{item.quantity}</div>
          </div>
          <div className="item">
            <h4>Price</h4>
            <div>$ {item.price}</div>
          </div>
          <div className="item btn">
            <div className="cart_remove_btn" onClick={() => props.removeItem(item._id)}>
              Remove
            </div>
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