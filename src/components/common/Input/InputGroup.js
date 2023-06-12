import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const InputGroup = ({ children, className }) => (
  <div className={classnames(['input-group', className])}>
    {children}
  </div>
);

InputGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

InputGroup.defaultProps = {
  children: null,
  className: undefined
};

export default InputGroup;
