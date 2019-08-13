import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faShoppingBag from '@fortawesome/fontawesome-free-solid/faShoppingBag';

const Button = (props) => {

  const buttons = () => {
    let template = '';
    switch (props.type) {
      case ('default'):
        template = <Link
          className={!props.altClass ? "link-default" : props.altClass}
          to={props.linkTo}
          {...props.addStyles}
        >
          {props.title}
        </Link>
        break;
      case ('bag-link'):
        template = <div
          className="bag-link"
          onClick={() => {
            props.runAction();
          }}
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
          />
        </div>
        break;
      case ('add-to-cart-link'):
        template = <div
          className="add-to-cart-link"
          onClick={() => {
            props.runAction();
          }}
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
          />
          Add to cart
        </div>
        break;
      default:
        template = '';
    }
    return template;
  }

  return (
    <div className="my-link">
      {buttons()}
    </div>
  );
};

export default Button;