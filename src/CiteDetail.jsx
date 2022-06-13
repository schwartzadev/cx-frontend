import React from 'react';

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

export default CiteDetail;
