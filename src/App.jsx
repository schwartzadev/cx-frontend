import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import Header from './Header';
import Attribution from './Attribution';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: false,
    };
  }

  hide() {
    this.setState({
      isHidden: false,
    });
  }

  render() {
    return (
      <div className="App" id="card-container">
        <Attribution />
        <Header />
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
      showReminders: true,
    };
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (typeof this.state.value === 'undefined') {
      alert('no urls were entered :(');
      return;
    }
    const rawUrls = this.state.value.split('\n');
    const urls = rawUrls.filter(isUrl);
    const badUrlsCount = rawUrls.length - urls.length;

    if (badUrlsCount === 1) {
      alert('1 url was removed because it was malformed');
    } else if (badUrlsCount > 1) {
      alert(`${badUrlsCount} urls were removed because they were malformed`);
    }

    if (urls.length > 5) {
      alert('please enter up to 5 urls');
      return;
    }
    this.setState({ urlList: urls });
    if (urls.length > 0) {
      this.setState({ showReminders: false }); // hide the reminders if urls have been entered
    }
  }

  render() {
    const { showReminders } = this.state;
    const textareaPlaceholder = 'Enter your source URLs (one per line)';
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
        {this.state.urlList.map((url, index) => (
          <Card url={url} key={index + 1} />
        ))}
      </div>
    );
  }
}

export default App;
