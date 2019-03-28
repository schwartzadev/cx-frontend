import React, { Component } from 'react';
import './App.css';
import wordVectors from './hardCodedCardWords.js';
import classNames from 'classnames';


const scoreCutoff = 0.2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardWords: wordVectors
    }
  }
  render() {
    return (
      <div className="App" id="card-container">
        <div id="card-body-container">
          {wordVectors.map(info => (
            <Word vector={info} />
          ))};
        </div>
      </div>
    );
  }
}

export default App;

function GetWordClasses(wordVectorValue) {
  if (wordVectorValue < scoreCutoff) {
    return classNames(
      'word',
      'cut-text'
    );
  } else {
    return classNames( 'word' );
  }
}

class Word extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var wordClasses = GetWordClasses(this.props.vector[1]);
    return (
      <div className="word-container-outer">
        <div className="word-container-inner">
          <div className={wordClasses}>{this.props.vector[0]}</div>
        </div>
      </div>
    );
  }
}