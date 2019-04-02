import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'
var moment = require('moment');

const attribution = '// GW-AS'; // TODO access this from cookies
const mercuryApiBaseUrl = 'http://localhost:5555/card/?url=';
var lastCardId = 0; // reset this to zero when "get source info" is clicked



class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      id: this.getNewCardId(),
      tag: "loading tag . . .", // pre-API call
      cite: "author ...",
      credential: ''
    }
    this.handleCredentialChange = this.handleCredentialChange.bind(this);
    this.tagContentEditable = React.createRef();
    this.citeContentEditable = React.createRef();
  }

  getNewCardId() {
    lastCardId++;
    return lastCardId;
  }

  componentDidMount () {
    fetch(mercuryApiBaseUrl + this.props.url)
    .then( results => {
      return results.json()
    }).then( data => {
      var author = null;
      if (data.mercury.author != null) { // set author
        author = data.mercury.author // TODO get only the last name here
      } else {
        author = data.mercury.domain
      }

      var dateInfo = this.generateDateStrings(data.mercury.date_published);
      this.setState({
        title: data.mercury.title,
        source: data.mercury.domain,
        tag: data.mercury.title,
        cite: author + ' ' + dateInfo.citeDate,
        accessDate: dateInfo.accessDate,
        publishedDate: dateInfo.publishedDate,
      });

    })
  }

  generateDateStrings(dateString) {
    var date = moment(dateString);
    var year = date.year();
    var now = moment();
    var currentYear = now.year();
    var citeDate;
    if (year === currentYear) {
      citeDate = date.format('M/D');
    } else {
      citeDate = date.format('YY');
    }
    return {
      citeDate: citeDate,
      publishedDate: date.format('M/D/Y'),
      accessDate: now.format('M/D/Y')
    }
  }

  handleTagChange = evt => { this.setState({tag: evt.target.value}); };
  handleCiteChange = evt => { this.setState({cite: evt.target.value}); };
  handleCredentialChange = evt => { this.setState({credential: evt.target.value});};

  getCredentialString() { return (this.state.credential === '') ? '' : '[' + this.state.credential + ']'; }
  // todo handle articles with no date
  // todo handle 404s

 cutCard() {
    console.log('cutting card...');
    console.log('tag: ' + this.state.tag);
    console.log('cite: ' + this.state.cite);
    console.log('title: ' + this.state.title);
    console.log('source: ' + this.state.source);
    console.log('publishedDate: ' + this.state.publishedDate);
    console.log('url: ' + this.state.url);
    console.log('accessDate: ' + this.state.accessDate);
    console.log('credential: ' + this.state.credential);
    console.log('attribution: ' + attribution);

    // make a call to the server w/ url params of card info -- return file, redirect page to download automatically
  }

  render() {
    return (
      <div className="card">
        <p className="card-label">Card #{this.state.id}</p>
        {/* TODO prevent new lines in here */}
        <ContentEditable
              innerRef={this.tagContentEditable}
              html={this.state.tag}
              onChange={this.handleTagChange}
              className="card-tag"
        />
        <ContentEditable
              innerRef={this.citeContentEditable}
              html={this.state.cite}
              onChange={this.handleCiteChange}
              className="card-cite"
              tagName="span"
        />

        <span className="card-cite-details">
          <span className="card-credential">{this.getCredentialString()}</span>
          <CiteDetail
                title={this.state.title}
                source={this.state.source}
                publishedDate={this.state.publishedDate}
                url={this.state.url}
                accessDate={this.state.accessDate}
          />
        </span>
        <textarea
            className="source-urls-prompt"
            rows={3}
            placeholder="enter your source credentials here (optional)"
            onChange={this.handleCredentialChange}
        />
        <div className="card-button-container">
          <button onClick={() => this.cutCard()} className="button button-small button-grey button-center">cut card</button>
        </div>
      </div>
    );
  }
}

class CiteDetail extends Component {
  render () {
    return (
      <span>
         "{this.props.title}" via {this.props.source}, 
          published on {this.props.publishedDate}. <a className="card-url" href={this.props.url}>{this.props.url}</a> via 
          Debate Cardify. DOA: {this.props.accessDate} {attribution}
      </span>
    )
  }
}

export default Card;
