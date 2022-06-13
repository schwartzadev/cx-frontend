import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './Attribution.css';


class Attribution extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;

    this.state = {
      value: cookies.get('attribution') || ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({value: event.target.value}); }

  handleSubmit(event) {
    const { cookies } = this.props;

    cookies.set('attribution', this.state.value, { path: '/' });

    event.preventDefault();
  }

  render() {
    return (
      <div className="attribution-container">
        <form onSubmit={this.handleSubmit}>
          <p className="attribution-label">Attribution:</p>
          <div>
            <input className="attribution-input" type="text" value={this.state.value} onChange={this.handleChange} />
            <input id="set-attribution-button" type="submit" value="Set"/>
          </div>
        </form>
      </div>
    );
  }
}

export default withCookies(Attribution);
