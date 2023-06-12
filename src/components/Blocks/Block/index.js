import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import parse from 'html-react-parser';
import Button from 'components/common/Button';
import { useDispatch } from 'react-redux';
import Icon from 'components/common/Icon';
import { ROTATE_BLOCK } from 'constants/actions';
import './index.scss';

import {
  BLOCK_PREVIEW,
  BLOCK_PICTURE,
} from 'constants/blockTypes';

const Block = ({
  guid,
  image,
  type,
  text,
  link,
  onClick,
  className,
  animation,
  technical
}) => {
  const dispatch = useDispatch();
  let order = null;

  const onRotate = (guid, order) => {
    dispatch({ type: ROTATE_BLOCK, guid, order });
  };

  const handleUp = (e) => {
    e.stopPropagation();
    onRotate(guid, 1);
    dispatch({ type: ROTATE_BLOCK, payload: { guid, order } });
  }

  const handleDown = (e) => {
    e.stopPropagation();
    onRotate(guid, -1);
    dispatch({ type: ROTATE_BLOCK, payload: { guid, order } });
  }

  const reactElement = parse(text);
  switch (type) {

    case BLOCK_PICTURE: {
      const block = (

        <div
          className={classnames([
            'block',
            'block__picture',
            { 'block__picture__with-image': image },
            { 'block__picture__with-button': link },
            { 'block__picture__with-image__with-button': image && link },
            className
          ])}
          onClick={onClick}
        >
          {image && (
            <img src={image} alt={text} />
          )}
          {text && (
            <div className="block__title">{text}</div>
          )}

        </div>




      );
      return <Button className="button-in-block" onClick={onClick} isPulse={animation} technical={technical}>
        {block}
        <div className="block-button-move-up"
          onClick={handleUp}>
          <Icon className="block-button-move-up__icon" type="arrowAltCircleUp" />
        </div>
        <div className="block-button-move-down"
          onClick={handleDown}>
          <Icon className="block-button-move-down__icon" type="arrowAltCircleDown" />
        </div>
      </Button>;

    }



    case BLOCK_PREVIEW:
    default: {
      const block = (
        <div className="block__widget">{reactElement}</div>
      );
      return <Button className="button-in-block" onClick={onClick} isPulse={animation} technical={technical}>
        {block}
        <div className="block-button-move-up"
          onClick={handleUp}>
          <Icon className="block-button-move-up__icon" type="arrowAltCircleUp" />
        </div>
        <div className="block-button-move-down"
          onClick={handleDown}>
          <Icon className="block-button-move-down__icon" type="arrowAltCircleDown" />
        </div>
      </Button>;
    }
  }

};

Block.propTypes = {
  image: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  link: PropTypes.string,
  animation: PropTypes.bool,
  technical: PropTypes.bool
};

Block.defaultProps = {
  image: undefined,
  type: undefined,
  text: '',
  link: undefined,
  animation: false,
  technical: false
};

export default Block;
