import React, { Component } from 'react';
import './App.css';
import wordVectors from './hardCodedCardWords.js';
import Card from './Card.js';


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
        <Card url={"https://www.thewrap.com/flashback-jamal-khashoggi-was-banned-from-appearing-in-saudi-media-for-criticizing-donald-trump/"} />
        <Card url={"https://thehill.com/homenews/campaign/434792-biden-leads-cnn-poll-but-harris-sanders-on-the-rise"} />
      </div>
    );
  }
}

class SourceURLsPrompt extends Component {
  constructor(props) {
    super(props);

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
    if (urls.length > 5) {
      alert('please enter up to 5 urls');
      return;
    }
    // todo call Mercury API here (async)
    // todo implement a maximum number of URLs allowed per request
  }

  render() {
    const textareaPlaceholder = "Enter your source URLs (one per line)";
    return (
      <form onSubmit={this.handleSubmit} className="source-urls-container">
          <textarea
            className="source-urls-prompt"
            rows={5}
            placeholder={textareaPlaceholder}
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
