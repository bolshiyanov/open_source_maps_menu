import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/common/Input';

import './index.scss';

const Links = ({ data, onChange }) => {
  data.sort((a, b) => a.order - b.order);
  return (
    <div className="links">
      {data.map((item) => (
        <Input
          className="links__item"
          key={item.title}
          icon={item.icon}
          value={item.value ?? ""}
          onChange={(value) => onChange(item.title, value)}
          placeholder={item.placeholder}
        />
      ))}
    </div>
  );
};

Links.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.number,
    icon: PropTypes.string,
    title: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string
  })),
  onChange: PropTypes.func
};

Links.defaultProps = {
  data: [],
  onChange: () => {}
};

export default Links;
