import React, { Component } from 'react';

import '../layout/css/startpage.css';

class StartPage extends Component {
  render() {
    return (
      <div id="mainDiv">
        <h1>HEROES NEVER DIE</h1>
        <h2>JOIN THE OVERWATCH COMMUNITY</h2>
        <div id="teaser-container">
          <div>
            <h3>TEAM UP</h3>
            <p>
              Search and find your perfect team with our player search and rank
              up in competitive or find your mates for quick play.
            </p>

            <p>You can filter for region, language, mode and rank.</p>
          </div>

          <div>
            <h3>SKILL UP</h3>
            <p>
              Find the best guides for any kind of game play. You will find
              everything from specific heroe guides, map knowledge, aim training
              to cool workshop codes you can try, exactly here.
            </p>

            <p>You even can share your knowledge with the community.</p>
          </div>

          <div>
            <h3>BE UP TO DATE</h3>
            <p>
              Discuss all the new patches, heroes, updates and tournaments with
              the community.
            </p>
            <p>
              Share your gameplay and get helpful tips from our members and help
              others.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default StartPage;
