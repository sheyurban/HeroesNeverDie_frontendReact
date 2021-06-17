import './App.css';
import React, { Component } from 'react';
import TopMenu from './components/topmenu';
import StartPage from './components/startpage';
import Home from './components/home';

import './layout/css/index.css';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

class App extends Component {
  render() {
    const user = this.props.user;
    let workspace;

    if (user) workspace = <StartPage />;
    else workspace = <Home />;
    return (
      <div className="App">
        <TopMenu />
        {workspace}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
