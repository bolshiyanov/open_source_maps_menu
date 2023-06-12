import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

import classnames from 'classnames';

import './index.scss';

const Button = ({
  children,
  onClick,
  className,
  style,
  noStyled,
  isInline,
  isPulse,
  technical,
  disabled
}) => {
  const { currentTheme } = useSelector((state) => state.config);
  const styles = isInline
    ? currentTheme.getFontColorStyles()
    : currentTheme.button.getStyles();
  const currentStyle = noStyled ? {} : { ...styles, ...style };
  const classNames = classnames([
    className,
    'button',
    {
      button__inline: isInline,
      pulse: isPulse,
      button__technical: technical && currentTheme.button.backgroundColor === 'transparent'
    }
  ]);
  return (
    <button
      className={classNames}
      onClick={(e) => !disabled && onClick(e)}
      type="button"
      style={currentStyle}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  noStyled: PropTypes.bool,
  isInline: PropTypes.bool,
  isPulse: PropTypes.bool,
  technical: PropTypes.bool,
  disabled: PropTypes.bool
};

Button.defaultProps = {
  children: null,
  onClick: () => {},
  className: '',
  style: {},
  noStyled: false,
  isInline: false,
  isPulse: false,
  technical: false,
  disabled: false
};

export default Button;
