import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './Attribution.css';

const Attribution = ({ cookies }) => {
  const [value, setValue] = React.useState(cookies.get('attribution') || '');

  const handleChange = (event) => setValue(event.target.value);

  const handleSubmit = (event) => {
    cookies.set('attribution', value, { path: '/' });
    event.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Attribution saved!');
  };

  return (
    <div className="attribution-container">
      <form onSubmit={handleSubmit}>
        <p className="attribution-label">Attribution:</p>
        <div>
          <input className="attribution-input" type="text" value={value} onChange={handleChange} />
          <input id="set-attribution-button" type="submit" value="Set" />
        </div>
      </form>
    </div>
  );
};

Attribution.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(Attribution);
