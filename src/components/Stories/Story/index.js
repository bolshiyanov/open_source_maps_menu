import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'components/common/Icon';
import photo from 'images/photo.png';
import Button from 'components/common/Button';

import { translatedProperty } from 'utils/translation';
import { ROTATE_STORY } from 'constants/actions';
import './index.scss';

const Story = (props) => {
    const {
        guid,
        image,
        onClick,
        onFilter,
        className,
    } = props;
    const title = translatedProperty(props, "title");

    const { catalogItems } = useSelector((state) => state.config.data);
    const itemsCount = catalogItems.filter(item => item.storyGuid === guid).length;
    const itemsPricedCount = catalogItems.filter(item => item.storyGuid === guid && item.price).length;
    const isFilter = itemsCount > 0;

    const dispatch = useDispatch();
    let order = null;
    
   
    const handleFilter = (e) => {
        if (isFilter && onFilter) {
            onFilter()
            e.stopPropagation();
        }
    }
    
    const onRotate = (guid, order) => {
        dispatch({ type: ROTATE_STORY, guid, order });
      };
      
    const handleLeft = (e) => {
        e.stopPropagation();
        onRotate(guid, 1);
        dispatch({ type: ROTATE_STORY, payload: { guid, order } });
    }

    const handleRight = (e) => {
        e.stopPropagation();
        onRotate(guid, -1);
        dispatch({ type: ROTATE_STORY, payload: { guid, order } });
    }


    const story = (
        <div className={classnames([{ 'story-theme2-picture': image }, className])}
            onClick={onClick}
        >
            <div className="story-photo-png" style={{ backgroundImage: `URL(${photo})` }}></div>
            <div className={isFilter ? "story-items-count" : "story-items-count-selected"}
                onClick={handleFilter}>{itemsCount}</div>

            <div className="story-button-move-left"
                onClick={handleLeft}>
                <Icon className="story-button-move-left__icon" type="arrowAltCircleLeft" />
            </div>
            <div className="story-button-move-right"
                onClick={handleRight}>
                <Icon className="story-button-move-right__icon" type="arrowAltCircleRight" />
            </div>

            <div className="story-theme2-picture__box" style={{ backgroundImage: `URL(${image})` }} />
            <Button className="story-theme2-picture-title" onClick={handleFilter}>{title}</Button>
        </div>
    );
    return story;
}





Story.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,

};

Story.defaultProps = {
    title: '',
    image: undefined,

};

export default Story;
