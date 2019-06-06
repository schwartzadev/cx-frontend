import React, { Component } from 'react';
import './App.css';
import wordVectors from './hardCodedCardWords.js';
import Card from './Card.js';
import Header from './Header.js';


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
        <Header />
        {/* <Setting label="Show word vectors in cards?" defaultChecked={false} onChecked={handleWordVectors} name="showWordVectors" />
        <hr />  */}
        <SourceURLsPrompt />
      </div>
    );
  }
}

function isUrl(str) {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

class SourceURLsPrompt extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      urlList: [],
      showReminders: true
    };
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (typeof this.state.value === "undefined") {
      alert('no urls were entered :(');
      return;
    }
    let rawUrls = this.state.value.split('\n');
    let urls = rawUrls.filter(isUrl);
    let badUrlsCount = rawUrls.length - urls.length;

    if (badUrlsCount === 1) {
      alert('1 url was removed because it was malformed')
    } else if (badUrlsCount > 1) {
      alert(badUrlsCount + ' urls were removed because they were malformed')
    }

    if (urls.length > 5) {
      alert('please enter up to 5 urls');
      return;
    }
    this.setState({ urlList: urls });
    if (urls.length > 0) {
      this.setState({showReminders: false}); // hide the reminders if urls have been entered
    }
  }

  render() {
    const showReminders = this.state.showReminders;
    const textareaPlaceholder = "Enter your source URLs (one per line)";
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="source-urls-container">
            <textarea
              className="source-urls-prompt"
              rows={5}
              placeholder={textareaPlaceholder}
              onChange={this.handleChange}
            />
            <input type="submit" value="Get Source Info" className="button button-blue" />
        </form>
        {showReminders ? (<p className="user-reminder-text">enter some URLs into the box above to get started...</p>) : (null)}
        {this.state.urlList.map(url => (
          <Card url={url} />
        ))}
      </div>
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
