import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';

import { ExpandMore } from '@material-ui/icons';

import './index.scss';

const Accordeon = ({ items, defaultExpanded }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const onToggle = (isExpanded, id) => {
    if (expanded === id && !isExpanded)
      setExpanded(null);
    else
      setExpanded(id);
  };

  return (
    <div className="accordeon">
      {
        items.map((item) => (
          <ExpansionPanel
            key={item.id}
            expanded={expanded === item.id}
            className="accordeon__item"
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMore />}
              onClick={(event, isExpanded) => onToggle(isExpanded, item.id)}
              className="accordeon__title"
            >
              {item.title}
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              className="accordeon__item__container"
            >
              {item.component}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))
      }
    </div>
  );
};

Accordeon.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    component: PropTypes.node
  })),
  defaultExpanded: PropTypes.string
};

Accordeon.defaultProps = {
  items: [],
  defaultExpanded: null
};

export default Accordeon;
