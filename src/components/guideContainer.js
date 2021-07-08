import React, { Component } from 'react';
import { connect } from 'react-redux';

import '../layout/css/guidecontainer.css';
import PostContainer from './postContainer';
import AddDialog from './addDialogGuide';

import * as postActions from '../actions/PostActions';

import { bindActionCreators } from 'redux';

import '../layout/css/modalLogin.css';

const mapStateToProps = (state) => {
  return state;
};

class GuideContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '', content: '', file: null, tags: [] };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow(e) {
    e.preventDefault();
    const { showAddDialogAction } = this.props;
    showAddDialogAction();
  }

  handleClose() {
    const { hideAddDialogAction } = this.props;
    hideAddDialogAction();
  }

  render() {
    var showDialog = this.props.PostReducer.showAddDialog;
    if (showDialog === undefined) showDialog = false;
    return (
      <div id="guideContainer">
        {/* <div className="filters">
          <div>MODE:</div>
          <div>REGION:</div>
          <div>LANGUAGE:</div>
          <div>RANK:</div>
        </div> */}

        <div
          className={
            this.props.PostReducer.updateMode
              ? 'hiddenElement buttonDiv'
              : 'buttonDiv'
          }
        >
          <button onClick={this.handleShow}>+</button>
        </div>
        <div
          show="showDialog"
          id="blurredBackground"
          className={showDialog ? '' : 'modalLoginHide'}
          onClick={this.handleClose}
        ></div>
        <AddDialog
          id="modalLogin"
          className={showDialog ? '' : 'modalLoginHide'}
          onClick={this.handleShow}
        />

        <PostContainer category={'guide'} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showAddDialogAction: postActions.getShowAddDialogAction,
      hideAddDialogAction: postActions.getHideAddDialogAction,
      addPost: postActions.addPost,
    },
    dispatch
  );

const connectedGuideContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GuideContainer);

export default connectedGuideContainer;
