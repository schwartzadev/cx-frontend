import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import ContentEditable from './react-contenteditable';

import CiteDetail from './CiteDetail';

const moment = require('moment');
const download = require('downloadjs');

const HOST = process.env.REACT_APP_API_HOST;

const mercuryApiBaseUrl = `${HOST}:5555/?url=`;
let lastCardId = 0; // reset this to zero when "get source info" is clicked

class Card extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);

    this.handleCredentialChange = this.handleCredentialChange.bind(this);
    this.tagContentEditable = React.createRef();
    this.citeContentEditable = React.createRef();

    const { cookies } = props;

    this.state = {
      url: this.props.url,
      tag: 'loading tag . . .', // pre-API call
      cite: 'author ...',
      credential: '',
      attribution: cookies.get('attribution') || '',
      id: this.getNewCardId(),
    };
  }

  getNewCardId() {
    lastCardId++;
    return lastCardId;
  }

  componentDidMount() {
    this.setState({ fetchInProgress: true }); // start fetching...

    fetch(mercuryApiBaseUrl + this.props.url) // TODO handle bad responses
      .then((results) => {
        this.setState({ fetchInProgress: false }); // done fetching...
        return results.json();
      }).then((data) => {
        let author = null;
        if (data.mercury.author != null) { // set author
          author = data.mercury.author; // TODO get only the last name here
        } else {
          author = data.mercury.domain;
        }

        const dateInfo = this.generateDateStrings(data.mercury.date_published);
        this.setState({
          title: data.mercury.title,
          source: data.mercury.domain,
          tag: data.mercury.title,
          cite: `${author} ${dateInfo.citeDate}`,
          accessDate: dateInfo.accessDate,
          body: data.mercury.content,
          publishedDate: dateInfo.publishedDate,
        });
      });
  }

  generateDateStrings(dateString) {
    const date = moment(dateString);
    const year = date.year();
    const now = moment();
    const currentYear = now.year();
    let citeDate;
    if (year === currentYear) {
      citeDate = date.format('M/D');
    } else {
      citeDate = date.format('YY');
    }
    return {
      citeDate,
      publishedDate: date.format('M/D/Y'),
      accessDate: now.format('M/D/Y'),
    };
  }

  handleTagChange = (evt) => { this.setState({ tag: evt.target.value }); };

  handleCiteChange = (evt) => { this.setState({ cite: evt.target.value }); };

  handleCredentialChange = (evt) => { this.setState({ credential: evt.target.value }); };

  getCredentialString() { return (this.state.credential === '' || this.state.credential === undefined) ? '' : `[${this.state.credential}]`; }
  // todo handle articles with no date
  // todo handle 404s

  cutCard() {
    const getFileName = (cite, tag) => `Cardify ${cite.replace(/[^a-z0-9]/gi, '_')}.docx`;

    console.log('cutting card...');

    const { state } = this;
    const postData = {
      title: state.title,
      cite: state.cite,
      tag: state.tag,
      source: state.source,
      published_date: state.publishedDate,
      access_date: state.accessDate,
      url: state.url,
      attribution: state.attribution,
      credential: state.credential,
      body: state.body,
    };
    console.log(postData);

    fetch(`${HOST}:8000/save`, {
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.blob())
      .then((blob) => download(
        blob,
        getFileName(this.state.cite, this.state.tag),
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ));
  }

  render() {
    const isFetching = this.state.fetchInProgress;
    if (isFetching) {
      return (
        <div className="card">
          <p className="card-label">
            Card #
            {this.state.id}
          </p>
          <div className="card-tag">loading...</div>
        </div>
      );
    }
    return (
      <div className="card">
        {/* TODO prevent new lines in here */}
        <p className="card-label">
          Card #
          {this.state.id}
        </p>
        <ContentEditable
          innerRef={this.tagContentEditable}
          html={this.state.tag}
          onChange={this.handleTagChange}
          className="card-tag"
          plainTextOnly
        />
        <ContentEditable
          innerRef={this.citeContentEditable}
          html={this.state.cite}
          onChange={this.handleCiteChange}
          className="card-cite"
          tagName="span"
          plainTextOnly
        />

        <span className="card-cite-details">
          <span className="card-credential">{this.getCredentialString()}</span>
          <CiteDetail
            title={this.state.title}
            source={this.state.source}
            publishedDate={this.state.publishedDate}
            url={this.state.url}
            accessDate={this.state.accessDate}
            attribution={this.state.attribution}
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

export default withCookies(Card);
