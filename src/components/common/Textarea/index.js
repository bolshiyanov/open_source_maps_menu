import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import TextareaGroup from './TextareaGroup';

import './index.scss';

const Textarea = ({
  className,
  value,
  placeholder,
  onChange,
  onClick,
  maxLength,
  type,
  icon
}) => {
  const inputClassName = classnames(['textarea', className]);
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
            className="textarea__hidden"
            value={value}
            onChange={(e) => e.target.files.length && onChange(e.target.files)}
          />
        </Button>
      );
    }
  }

  if (icon) {
    return (
      <TextareaGroup className={className}>
        {iconComponent}
        {type !== 'file' && (
          <textarea
            type={type}
            placeholder={placeholder}
            className="textarea textarea__grouped"
            value={value}
            maxLength={maxLength}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </TextareaGroup>
    );
  }

  return (
    <textarea
      type={type}
      placeholder={placeholder}
      className={inputClassName}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

Textarea.propTypes = {
  className: PropTypes.string,
  maxLength: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.string,
  onClick: PropTypes.func
};

Textarea.defaultProps = {
  className: undefined,
  maxLength: '',
  value: '',
  placeholder: '',
  onChange: () => {},
  type: 'text',
  icon: undefined,
  onClick: undefined
};

export default Textarea;