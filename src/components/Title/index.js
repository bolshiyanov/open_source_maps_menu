import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Slider from 'components/common/Slider';
import {__} from 'utils/translation';
import { UPDATE_CONFIG_DATA } from 'constants/actions';

import TitleSettings from './TitleSettings';
import Button from 'components/common/Button';

import './index.scss';

const Title = () => {
  const [data, setData] = useState({
    title: '', description: '',
    googleAnalytics: '', constructor: '',
  });
  const [settingsOpened, setSettingsOpened] = useState(false);

  const { title, description, googleAnalytics, seoSettings, constructor } = useSelector((state) => state.config.data);

  useEffect(() => {
    setData({ title, description, googleAnalytics, constructor, seoSettings });
  }, [title, description, googleAnalytics, constructor, seoSettings]);

  const onChangeData = useCallback((newTitle, newDescription,
    newGoogleAnalytics, newConstructor, newSeoSettings) => {
    setData({
      title: newTitle, description: newDescription,
      googleAnalytics: newGoogleAnalytics, constructor: newConstructor, seoSettings: newSeoSettings
    });
  }, [setData]);

  const closeTitleSettings = useCallback(() => setSettingsOpened(false), [setSettingsOpened]);
  const dispatch = useDispatch();
  const submitSettings = () => {
    dispatch({
      type: UPDATE_CONFIG_DATA, title: data.title, description: data.description,
      googleAnalytics: data.googleAnalytics, constructor: data.constructor,
      seoSettings: data.seoSettings
    });
    closeTitleSettings();
  }; 

  return (
    <React.Fragment>
        <Button className="title-theme2-button" onClick={() => setSettingsOpened(true)}>
        <h1 className="title-theme2" onClick={() => setSettingsOpened(true)}>{data.title || __("Заголовок приложения")}</h1>
        <div className="description-theme2" onClick={() => setSettingsOpened(true)}>{data.description || __("Описание приложения (нажмите чтобы изменить)")}</div>
        
      </Button>

        
      
      <Slider
        opened={settingsOpened}
        onClose={closeTitleSettings}
        title={__("Настройка заголовка")}
        subtitle={__("НАСТРОЙ ЗАГОЛОВОК И ОПИСАНИЕ СВОЕГО ПРИЛОЖЕНИЯ. ЭТОТ БЛОК ОСОБЕННО ВАЖЕН ПРИ ПЕРВОМ ОТКРЫТИИ.")}
        onSubmit={submitSettings}
      >
        <TitleSettings title={data.title} description={data.description}
          googleAnalytics={data.googleAnalytics} constructor={data.constructor}
          seoSettings={data.seoSettings} onChange={onChangeData} />
      </Slider>
    </React.Fragment>
  );
};

export default Title;

