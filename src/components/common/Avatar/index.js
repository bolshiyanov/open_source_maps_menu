import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import addedAvatar from 'images/CafeLogo.png';

import AvatarBase from 'components/common/AvatarBase';
import Slider from 'components/common/Slider';

import { UPDATE_CONFIG_AVATAR } from 'constants/actions';
import { __ } from 'utils/translation';

import UserAvatarSettings from 'components/Title/UserAvatarSettings.js';
import './index.scss';

const Avatar = () => {
  const [data, setData] = useState({ name: '', avatar: '' });
  const [settingsOpened, setSettingsOpened] = useState(false);

  const { name, avatar, avatarPreview } = useSelector((state) => state.config.data);

  useEffect(() => {
    setData({ name, avatar, avatarPreview });
  }, [name, avatar, avatarPreview]);

  const onChangeData = useCallback((newName, newAvatar, newPreview) => {
    setData({ name: newName, avatar: newAvatar, avatarPreview: newPreview });
  }, [setData]);

  const closeTitleSettings = useCallback(() => setSettingsOpened(false), [setSettingsOpened]);
  const dispatch = useDispatch();
  const submitSettings = () => {
    dispatch({ type: UPDATE_CONFIG_AVATAR, name: data.name, avatar: data.avatar, avatarPreview: data.avatarPreview });
    closeTitleSettings();
  };

  return (
    <React.Fragment>
      <div className="avatar-username-box">
        <AvatarBase avatar={data.avatar} avatarPreview={data.avatarPreview} avatarDefault={addedAvatar}
          wrapperImageClass="avatar" onClick={() => setSettingsOpened(true)} />
        <div className="user-name" onClick={() => setSettingsOpened(true)}> {data.name || __("Название твоего ресторана")} </div>
      </div>
      {
        settingsOpened && (
          <Slider
            opened={settingsOpened}
            onClose={closeTitleSettings}
            title={__("Загрузи логотип и добавь название ресторана")}
            subtitle={__("Рекомендуется загрузить изображение с прозрачным фоном (в формате .png)")}
            onSubmit={submitSettings}
          >
            <UserAvatarSettings name={data.name} image={data.avatar} preview={data.avatarPreview} onChange={onChangeData} />
          </Slider>
        )}
    </React.Fragment>
  );
};





Avatar.propTypes = {
  image: PropTypes.string
};

Avatar.defaultProps = {
  image: '',
};

export default Avatar;
