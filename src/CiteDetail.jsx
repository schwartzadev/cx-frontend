import React from 'react';
import PropTypes from 'prop-types';

const CiteDetail = ({
  title,
  source,
  publishedDate,
  url,
  accessDate,
  attribution,
}) => (
  <span>
    &quot;
    {title}
    &quot; via
    {' '}
    {source}
    ,
    published on
    {' '}
    {publishedDate}
    .
    {' '}
    <a className="card-url" href={url}>{url}</a>
    {' '}
    via
    Debate Cardify. DOA:
    {' '}
    {accessDate}
    {' '}
    {attribution}
  </span>
);

CiteDetail.propTypes = {
  title: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  accessDate: PropTypes.string.isRequired,
  attribution: PropTypes.string,
};

CiteDetail.defaultProps = {
  attribution: '',
};

export default CiteDetail;
