import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {__} from 'utils/translation';
import Input from 'components/common/Input';

import fileReader, { getThumbnail } from 'utils/fileReader';

const UserAvatarSettings = ({
  name,
  image,
  preview,
  onChange
}) => {
  const [videoAvatar, setVideoAvatar] = useState(null);
  const [videoPreviewPreloaded, setVideoPreviewPreloaded] = useState(null);

  const uploadImage = async (value) => {
    let imageData = await fileReader(value[0]);
    if ((imageData?.startsWith("data:video") ?? false)) {
      setVideoAvatar(imageData);
      onChange(name, imageData, undefined);
    } else {
      onChange(name, imageData, undefined);
    }
  };

  const uploadPreview = async (value) => {
    let imageData = await fileReader(value[0]);
    onChange(name, videoAvatar, imageData);
  };

  return <div className="title-settings"> 
    <Input
      value={name}
      placeholder={__("Название твоего ресторана")}
      onChange={(value) => onChange(value, image, preview)}
    />
    <Input
        className={classnames([
          { used: Boolean(image) }
        ])}
        type="file"
        icon="photoVideo"
        placeholder={__("Введите ссылку на логотип")}
        onChange={(value) => uploadImage(value)}
        onClick={image ? () => onChange(name, undefined, undefined) : undefined}
      />
    {videoAvatar && !videoPreviewPreloaded && <div>{__("Изображение для обложки")}</div>}
    {videoAvatar && !videoPreviewPreloaded && <Input
        className={classnames([
          { used: Boolean(preview) }
        ])}
        type="file"
        icon="photoVideo"
        placeholder={__("Введите ссылку на логотип")}
        onChange={(value) => uploadPreview(value)}
        onClick={preview ? () => onChange(name, videoAvatar, undefined) : undefined}
      />}
  </div>
}

UserAvatarSettings.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  onChange: PropTypes.func
};

UserAvatarSettings.defaultProps = {
  name: '',
  image: '',
  onChange: () => {}
};

export default UserAvatarSettings;
