import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bck_b_dark">
      <div className="container">
        <div className="logo">
          BOAT
        </div>
        <div className="wrapper">
          <div className="left">
            <h2>Contact Information</h2>
            <div className="business_nfo">
              <div className="tag">
                <FontAwesomeIcon
                  icon={faCompass}
                  className="icon"
                />
                <div className="nfo">
                  <div>Address</div>
                  <div>123 Fake St.</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="icon"
                />
                <div className="nfo">
                  <div>Phone</div>
                  <div>(123) 456-7890</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                  icon={faClock}
                  className="icon"
                />
                <div className="nfo">
                  <div>Hours</div>
                  <div>M-F 9AM-6PM</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="icon"
                />
                <div className="nfo">
                  <div>Email</div>
                  <div>info@boat.com</div>
                </div>
              </div>
            </div>
          </div>
          <div className="left">
            <h2>Be the first to know</h2>
            <div>Get all the latest</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;