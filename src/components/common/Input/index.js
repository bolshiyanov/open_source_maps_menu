import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import InputGroup from './InputGroup';

import './index.scss';

const Input = ({
  className,
  value,
  placeholder,
  onChange,
  onClick,
  type,
  name,
  icon
}) => {
  const inputClassName = classnames(['input', className]);
  const inputRef = useRef(null);

  let iconComponent = null;
  if (icon) {
    iconComponent = (
      <div className="input__icon">
        <Icon type={icon} />
      </div>
    );

    if (type === 'file') {
      const onClickHandler = onClick || (() => inputRef.current.click());
      iconComponent = (
        <Button
          isInline
          noStyled
          className={classnames(['input', 'input__file', className])}
          onClick={onClickHandler}
        >
          <Icon type={icon} />
          <input
            ref={inputRef}
            type="file"
            className="input__hidden"
            value={value}
            onChange={(e) => e.target.files.length && onChange(e.target.files)}
          />
        </Button>
      );
    }
  }

  if (icon) {
    return (
      <InputGroup className={className}>
        {iconComponent}
        {type !== 'file' && (
          <input
            type={type}
            placeholder={placeholder}
            className="input input__grouped"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </InputGroup>
    );
  }

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={inputClassName}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

Input.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func
};

Input.defaultProps = {
  className: undefined,
  value: '',
  name: '',
  placeholder: '',
  onChange: () => {},
  type: 'text',
  icon: undefined,
  onClick: undefined
};

export default Input;
