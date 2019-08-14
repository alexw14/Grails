import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faPhone,
  faDove,
  faEnvelopeSquare
} from '@fortawesome/free-solid-svg-icons';
import faMapMaker from '@fortawesome/fontawesome-free-solid/faDove'

const Footer = ({ data }) => {
  return (
    data.siteInfo ?
      <footer className="background-black">
        <div className="container">
          <div className="footer-wrapper">
            <div className="left-section">
              <div className="business-info">
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="icon"
                  />
                  <div className="info">
                    <div>Location</div>
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
                    icon={faDove}
                    className="icon"
                  />
                  <div className="info">
                    <div>Twitter</div>
                    <div>{data.siteInfo[0].hours}</div>
                  </div>
                </div>
                <div className="tag">
                  <FontAwesomeIcon
                    icon={faEnvelopeSquare}
                    className="icon"
                  />
                  <div className="info">
                    <div>Contact</div>
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