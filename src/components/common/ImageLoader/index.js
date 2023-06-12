import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {__} from 'utils/translation';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import InputGroup from 'components/common/Input/InputGroup';
import Popup from 'components/common/Popup';
import CropImage from 'components/common/CropImage';

import {
  BLOCK_PREVIEW,
  BLOCK_TEXT,
  BLOCK_PICTURE
} from 'constants/blockTypes';

import Block from '../Block';

import './index.scss';

const BlockSettings = (props) => {
  const [selectedImage, setSelectedImage] = useState(undefined);

  const updateSettings = (blockType, value) => {
    const { onChange, ...settings } = props;
    onChange({
      ...settings,
      [blockType]: value
    });
  };

  const {
    type,
    link,
    text,
    image
  } = props;

  const uploadImage = (value) => {
    const imageUrl = value[0];
    setSelectedImage(imageUrl);
  };

  const onCropSave = (value) => {
    updateSettings('image', value);
    setSelectedImage(undefined);
  };

  return (
    <React.Fragment>
      <div className="block-settings">
        <div className="block-settings__types">
          <Button
            isInline
            noStyled
            onClick={() => updateSettings('type', BLOCK_PREVIEW)}
          >
            <Icon
              type="alignLeft"
              className={classnames({ 'block-settings__types__selected': type === BLOCK_PREVIEW })}
            />
          </Button>
          <Button
            isInline
            noStyled
            onClick={() => updateSettings('type', BLOCK_TEXT)}
          >
            <Icon
              type="alignCenter"
              className={classnames({ 'block-settings__types__selected': type === BLOCK_TEXT })}
            />
          </Button>
          <Button
            isInline
            noStyled
            onClick={() => updateSettings('type', BLOCK_PICTURE)}
          >
            <Icon
              type="alignJustify"
              className={classnames({ 'block-settings__types__selected': type === BLOCK_PICTURE })}
            />
          </Button>
        </div>
        <div className="block-settings__settings">
          <Input
            className="block-settings__settings__input"
            value={link}
            placeholder="URL"
            onChange={(value) => updateSettings('link', value)}
          />
          <InputGroup>
            <Input
              className={classnames([
                'block-settings__settings__input',
                { used: Boolean(image) }
              ])}
              type="file"
              icon="fileImage"
              onChange={(value) => uploadImage(value)}
              onClick={image ? () => updateSettings('image', undefined) : undefined}
            />
            <Input
              className="block-settings__settings__input"
              value={text}
              placeholder={__("Текст")}
              onChange={(value) => updateSettings('text', value)}
            />
          </InputGroup>
        </div>
        <div className="block-settings__preview">
          <div className="block-settings__preview__title">{__("Предпросмотр")}</div>
          <Block
            className="block-settings__preview__block"
            image={image}
            type={type}
            text={text}
            link={link}
          />
        </div>
      </div>
      {
        selectedImage && (
          <Popup visible={Boolean(selectedImage)}>
            <CropImage
              file={selectedImage}
              onSave={onCropSave}
            />
          </Popup>
        )
      }
    </React.Fragment>
  );
};

BlockSettings.propTypes = {
  type: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  animation: PropTypes.bool,
  onChange: PropTypes.func
};

BlockSettings.defaultProps = {
  type: '',
  link: '',
  text: '',
  image: '',
  animation: false,
  onChange: () => {}
};

export default BlockSettings;
