import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/HeaderFooter/Header';
import Footer from '../components/HeaderFooter/Footer';
import { getSiteInfo } from '../actions/site_actions';

class Layout extends Component {

  componentDidMount() {
    this.props.dispatch(getSiteInfo());
  }

  render() {
    return (
      <div>
        <Header />
        <div className="page-container">
          {this.props.children}
        </div>
        <Footer data={this.props.site} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    site: state.site
  }
}

export default connect(mapStateToProps)(Layout);