import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCompass,
  faPhone,
  faClock,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';

const Footer = ({ data }) => {
  return (
    data.siteInfo ?
      <footer className="background-black">
        <div className="container">
          <div className="footer-wrapper">
            <div className="left-section">
              <div className="title">Contact Information</div>
              <div className="business-info">
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faCompass}
                    className="icon"
                  />
                  <div className="info">
                    <div>Address</div>
                    <div>{data.siteInfo[0].address}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="icon"
                  />
                  <div className="info">
                    <div>Phone</div>
                    <div>{data.siteInfo[0].phone}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="icon"
                  />
                  <div className="info">
                    <div>Hours</div>
                    <div>{data.siteInfo[0].hours}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="icon"
                  />
                  <div className="info">
                    <div>Email</div>
                    <div>{data.siteInfo[0].email}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="links-info">
              <div className="left-section">
                <div className="link">Assurance of Authenticity</div>
                <div className="link">Careers</div>
                <div className="link">FAQS</div>
                <div className="link">Privacy</div>
              </div>
              <div>
                <div className="link">Returns</div>
                <div className="link">Support</div>
                <div className="link">Terms</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      : null
  );
};

export default Footer;