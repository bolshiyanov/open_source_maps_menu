import React from 'react';
import PropTypes from 'prop-types';

const SiteFrame = ({
  url
}) => {
  return null;

  return (
    <iframe src={url} width="0" height="0" frameBorder="0" style={{visibility: 'hidden'}}></iframe>
  );
};

SiteFrame.propTypes = {
  url: PropTypes.string
};

SiteFrame.defaultProps = {
  url: null
};

export default SiteFrame;
