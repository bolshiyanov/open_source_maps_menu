import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


import './index.scss';

const Picker = ({ selected, items, className, itemClassName, nameTheme }) => (

  <div className={classnames(['picker__container', className])}>
    {
      items.map((item) => (
        <div
          className={classnames([itemClassName, { picker__item__selected: selected === item.id }])}
          key={item.id ?? (Math.random().toString(36))}
        >
          <div>{item.component}
            {item.id && <div className="theme-name" >
              {item.id}
            </div>}
          </div>
        </div>
      ))
    }
  </div>
);

Picker.propTypes = {
  selected: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    component: PropTypes.node
  })),
  className: PropTypes.string,
  itemClassName: PropTypes.string
};

Picker.defaultProps = {
  selected: null,
  items: [],
  className: undefined,
  itemClassName: 'picker__item'
};

export default Picker;
