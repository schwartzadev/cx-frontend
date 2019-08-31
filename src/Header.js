import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
  render() {
    return (
      <div className="header">
        <h1>cards.cx</h1>
        <h3>Easily transform URLs into debate cards</h3>
        <p>Try it out! Enter URLs into the box below:</p>
      </div>
    );
  } // todo style this nicely
}

export default Header;
