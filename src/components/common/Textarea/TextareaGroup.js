import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const TextareaGroup = ({ children, className }) => (
  <div className={classnames(['input-group', className])}>
    {children}
  </div>
);

TextareaGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

TextareaGroup.defaultProps = {
  children: null,
  className: undefined
};

export default TextareaGroup;