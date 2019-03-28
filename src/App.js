import React, { Component } from 'react';
import './App.css';
import wordVectors from './hardCodedCardWords.js';
import classNames from 'classnames';


const scoreCutoff = 0.2;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardWords: wordVectors,
      isHidden: false
    }
  }

  hide() {
    this.setState({
      isHidden: false
    })
  }

  render() {
    return (
      <div className="App" id="card-container">
        <Setting label="Show word vectors in cards?" defaultChecked={false} onChecked={handleWordVectors} name="showWordVectors" />
        <hr />
        <SourceURLsPrompt />
        <Card wordVectors={wordVectors} />
        <Card wordVectors={wordVectors} />
      </div>
    );
  }
}

class SourceURLsPrompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '' // textarea initial value
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let urls = this.state.value.split('\n');
    console.log(urls);
    // todo call Mercury API here (async)
    // todo implement a maximum number of URLs allowed per request
  }

  render() {
    const textareaPlaceholder = "Enter your source URLs (one per line)";
    return (
      <form onSubmit={this.handleSubmit} className="source-urls-container">
          <textarea
            className="source-urls-prompt"
            rows={6}
            placeholder={textareaPlaceholder}
            value={this.state.value}
            onChange={this.handleChange}
          />
        <input type="submit" value="Get Source Info" />
      </form>
    )
  }
}


function handleWordVectors(status) {
  let updatedState = status ? 'block' : 'none';
  for (let el of document.querySelectorAll('.word-vector')) el.style.display = updatedState; // update the style of all of the word-vector elements
}


export default App;


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false
    }
  }

  hide() {
    this.setState({
      isHidden: true
    })
  }

  render() {
    return (
      <div className="card-body-container" style={this.state.isHidden ? {display: 'none'} : {display: 'block'} }>
        <span className="close-div-button" onClick={this.hide.bind(this)} >&times;</span> {/*} todo put this in a flexbox with the cutting toggles */}
        {this.props.wordVectors.map(info => (
          <Word vector={info} />
        ))};
      </div>
    );
  }
}


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
    const value = target.checked;

    this.props.onChecked(target.checked);

    this.setState({
      'isChecked': value
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
