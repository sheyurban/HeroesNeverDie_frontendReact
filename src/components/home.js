import React, { Component } from 'react';

import '../layout/css/mainFrame.css';

import MainFrame from './mainFrame';
// import ProfilFrame from './profileFrame';

import '../layout/css/startpage.css';

class Home extends Component {
  render() {
    return (
      <div id="homepage">
        <MainFrame />
        {/* <ProfilFrame /> */}
      </div>
    );
  }
}

export default Home;
