import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/mainFrame.css';

import MainFrame from './mainFrame';
import ProfilFrame from './profileFrame';
import '../layout/css/startpage.css';

const mapStateToProps = (state) => {
  return state;
};

class Home extends Component {
  render() {
    let frame;
    if (!this.props.TabReducer.showProfilArea) frame = <MainFrame />;
    else frame = <ProfilFrame />;
    return <div id="homepage">{frame}</div>;
  }
}

const connectedHome = connect(mapStateToProps)(Home);

export default connectedHome;
