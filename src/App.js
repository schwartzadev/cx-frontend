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
        <Setting label="Show word vectors in card?" defaultChecked={false} onChecked={handleWordVectors} name="showWordVectors" />
        <hr />
        <div id="card-body-container">
          {wordVectors.map(info => (
            <Word vector={info} />
          ))};
        </div>
      </div>
    );
  }
}


function handleWordVectors(status) {
  let updatedState = '';
  if (status) { // to show the vectors
    updatedState = 'block';
  } else { // to hide the vectors
    updatedState = 'none';
  }
  for (let el of document.querySelectorAll('.word-vector')) el.style.display = updatedState; // update the style of all of the word-vector elements
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
          <div className="word-vector">{ Math.round(this.props.vector[1] * 100) }</div>
        </div>
      </div>
    );
  }
}

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: this.props.defaultChecked,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.props.onChecked(target.checked);

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          {this.props.label}
          <input
            name={this.props.name}
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
