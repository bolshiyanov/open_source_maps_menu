import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './index.scss';

const Popup = ({ children, className, visible }) => (
  <div className={classnames(['popup', className, { popup__visible: visible }])}>
    {children}
  </div>
);

Popup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  visible: PropTypes.bool
};

Popup.defaultProps = {
  children: null,
  className: undefined,
  visible: false
};

export default Popup; 
