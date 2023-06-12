import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { __ } from 'utils/translation';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';

import addedMenu from 'images/addedmenu.jpg';

import { EDIT_STORY, REMOVE_STORY, ROTATE_STORY, CATALOG_FILTER } from 'constants/actions';

import StorySettings from './StorySettings';
import Story from './Story';
import history from 'utils/history';

import './index.scss';
import { concat } from 'lodash';

const emptySettings = {
  guid: null,
  type: 'preview-text',
  order: null,
  linkUrl: '',
  description: '',
  image: '',
};

const Stories = ({ data }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [storyData, setStoryData] = useState(emptySettings);
  const { storyGuid } = useSelector((state) => state.config);
  const showDescription = true;
  const closeStoriesSettings = () => {
    setSettingsOpened(null);
  };

  const addStorySettings = () => {
    setSettingsOpened(uuid());
  }

  const onOpenStorySettings = ({ guid }) => {
    setSettingsOpened(guid);
  };

  const dispatch = useDispatch();
  const submitSettings = () => {
    if (storyData.description || storyData.image)
      dispatch({ type: EDIT_STORY, payload: storyData });
    closeStoriesSettings();
  };

  const removeSettings = () => {
    dispatch({ type: REMOVE_STORY, guid: storyData.guid });
    closeStoriesSettings();
  };

  const { stories } = useSelector((state) => state.config.data);
  const { active, paymentData } = useSelector((state) => state.config.account);

  useEffect(() => {
    const currentStory = stories.find((story) => story.guid === settingsOpened);
    const settings = currentStory || { ...emptySettings };
    if (!settings.guid && settingsOpened) {
      settings.guid = settingsOpened;
    } else if (!settings.guid) {
      settings.guid = uuid();
    }
    setStoryData({ ...settings });
    console.log(concat("Stories effect ", settingsOpened ? settingsOpened.toString() : ""));
  }, [settingsOpened, stories]);

  const onRotate = (guid, order) => {
    dispatch({ type: ROTATE_STORY, guid, order });
  };

  const setStoryFilter = ({ guid }) => {
    dispatch({ type: CATALOG_FILTER, storyGuid: storyGuid !== guid ? guid : null });
  }

  const handleImport = (data) => {
    dispatch({ type: EDIT_STORY, payload: data });
  }

  stories.sort((a, b) => b.order - a.order);
  return (
    <React.Fragment>
      {data.length > 0 && (
        <div className="stories-theme2">
          <div className="stories-theme2-picker">
            <div className="stories-theme2-picker__empty">
              <div className="stories-theme2-picker-item">
                <div className="stories-theme2-picker-item-flexbox">
                  <div className="stories-theme2-picker-item-flexbox__box" onClick={addStorySettings} style={{ backgroundImage: `URL(${addedMenu})` }} />
                  <Button onClick={addStorySettings} className="stories-theme2-picker-item-flexbox__title">{__("Создайте разделы меню")}</Button>
                  <div className="stories-theme2-picker-item-flexbox__icon" onClick={addStorySettings}><Icon type="plusCircle" /></div>
                </div>
              </div>

              {data.map((story) =>
                <Story className={classnames(['stories-theme2-picker-item'])}
                  onClick={() => onOpenStorySettings(story)}
                  onFilter={() => setStoryFilter(story)}
                  key={story.guid} {...story} />)}

            </div>
          </div>
        </div>
      )}

      {data.length === 0 && (<div className="stories-theme2">
        <div className="stories-theme2-picker">
          <div className="stories-theme2-picker__empty">
            <div className="stories-theme2-picker-item">
              <div className="stories-theme2-picker-item-flexbox">
                <div className="stories-theme2-picker-item-flexbox__box" onClick={addStorySettings} style={{ backgroundImage: `URL(${addedMenu})` }} />
                <Button onClick={addStorySettings} className="stories-theme2-picker-item-flexbox__title">{__("Создайте разделы меню")}</Button>
                <div className="stories-theme2-picker-item-flexbox__icon" onClick={addStorySettings}><Icon type="plusCircle" /></div>
              </div>
            </div>
            <div className="stories-theme2-picker-item">
              <div className="stories-theme2-picker-item-flexbox">
                <div className="stories-theme2-picker-item-flexbox__box" onClick={addStorySettings} style={{ backgroundImage: `URL(${addedMenu})` }} />
                <Button onClick={addStorySettings} className="stories-theme2-picker-item-flexbox__title">{__("Создайте разделы меню")}</Button>
                <div className="stories-theme2-picker-item-flexbox__icon" onClick={addStorySettings}><Icon type="plusCircle" /></div>
              </div>
            </div>
            <div className="stories-theme2-picker-item">
              <div className="stories-theme2-picker-item-flexbox">
                <div className="stories-theme2-picker-item-flexbox__box" onClick={addStorySettings} style={{ backgroundImage: `URL(${addedMenu})` }} />
                <Button onClick={addStorySettings} className="stories-theme2-picker-item-flexbox__title">{__("Создайте разделы меню")}</Button>
                <div className="stories-theme2-picker-item-flexbox__icon" onClick={addStorySettings}><Icon type="plusCircle" /></div>
              </div>
            </div>
            <div className="stories-theme2-picker-item">
              <div className="stories-theme2-picker-item-flexbox">
                <div className="stories-theme2-picker-item-flexbox__box" onClick={addStorySettings} style={{ backgroundImage: `URL(${addedMenu})` }} />
                <Button onClick={addStorySettings} className="stories-theme2-picker-item-flexbox__title">{__("Создайте разделы меню")}</Button>
                <div className="stories-theme2-picker-item-flexbox__icon" onClick={addStorySettings}><Icon type="plusCircle" /></div>
              </div>
            </div>
            <div className="stories-theme2-picker-item">
              <div className="stories-theme2-picker-item-flexbox">
                <div className="stories-theme2-picker-item-flexbox__box" onClick={addStorySettings} style={{ backgroundImage: `URL(${addedMenu})` }} />
                <Button onClick={addStorySettings} className="stories-theme2-picker-item-flexbox__title">{__("Создайте разделы меню")}</Button>
                <div className="stories-theme2-picker-item-flexbox__icon" onClick={addStorySettings}><Icon type="plusCircle" /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}





      <Slider
        opened={settingsOpened !== null}
        onClose={closeStoriesSettings}
        title={__("Добавление разделов меню")}
        subtitle={
          <React.Fragment>
            <p>{__("Создай разделы меню такие как: Фирменные блюда, Холодные закуски, Салаты, Прохладительные напитки, Кофе и так далее...")}<br />
            </p>


          </React.Fragment>}
        onRemove={settingsOpened && removeSettings}
        onSubmit={submitSettings}
      >
        <StorySettings {...storyData} showDescription={showDescription} onRotate={onRotate}
          onChange={(settings) => setStoryData({ ...storyData, ...settings })}
          onImport={(settings) => handleImport({ ...storyData, ...settings })} />
      </Slider>

    </React.Fragment>
  );
};

Stories.propTypes = {
  showDescription: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

Stories.defaultProps = {
  showDescription: true,
  data: []
};

export default Stories;
