import React, { Component } from 'react';

import MainFrame from './mainFrame';

import '../layout/css/startpage.css';

class Home extends Component {
  render() {
    return (
      <div id="homepage">
        <MainFrame />
      </div>
    );
  }
}

export default Home;
