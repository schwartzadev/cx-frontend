import React, { Component } from 'react';
import ContentEditable from 'react-contenteditable'
var moment = require('moment');

const credential = '// GW-AS'; // TODO access this from cookies
const mercuryApiBaseUrl = 'http://localhost:5555/card/?url=';
var lastCardId = 0; // reset this to zero when "get source info" is clicked


class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: this.props.url,
      id: this.getNewCardId(),
      tag: "tag tag tag tag tag" // pre-API call
    }
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
          "{this.state.title}" via {this.state.source}, 
          published on {this.state.publishedDate}. {this.state.url} via Debate Cardify. DOA: {this.state.accessDate} {credential}
        </span>
      {/*TODO add a textarea here to enter credentials, also add credentials as var in state, bind to textarea*/}
      </div>
    );
  }
}

export default Card;
