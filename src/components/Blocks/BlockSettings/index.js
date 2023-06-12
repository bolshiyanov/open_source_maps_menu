import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea';
import Popup from 'components/common/Popup';
import CropImage from 'components/common/CropImage';
import API from 'utils/api';
import { validUrl } from 'utils/url';
import { __, translatedProperty, translatedPropertyName, supportedLanguages, getDefaultLanguage, translate } from 'utils/translation';
// import { useSelector, useDispatch } from 'react-redux';
// import { EDIT_BLOCK} from 'constants/actions';
import {
  BLOCK_PREVIEW,
  BLOCK_TEXT,
  BLOCK_PICTURE
} from 'constants/blockTypes';

// import Block from '../Block';

import './index.scss';

const BlockSettings = (props) => {
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [loadingLink, setLoadingLink] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [translateText, setTranslateText] = useState(false);
  const [textLang, setTextLang] = useState(getDefaultLanguage());
  const [textTranslating, setTextTranslating] = useState(false);

  const changeSettings = (blockType, value) => {
    const {
      onChange,
      order,
      onRotate,
      ...settings
    } = props;

    if (blockType === "text" && !translateText) {
      var updating = {
        ...settings,
        text: value 
      };
      supportedLanguages.forEach(lang => {
        updating[translatedPropertyName("text", lang)] = value;
      });
      onChange(updating);
    } else if (blockType === "text" && translateText) {
      onChange({
        ...settings,
        text: value,
        [translatedPropertyName("text", textLang)]: value
      })
    } else if (blockType.startsWith("text") && !blockType.startsWith("text")) {
      onChange({
        ...settings,
        [blockType]: value
      })
    } else {
      onChange({
        ...settings,
        [blockType]: value
      });
    }
  };

  const {
    type,
    link,
    image,
    animation,
    guid,
    onRotate
  } = props;
  let text = translatedProperty(props, "text", textLang, true);
  if (!text && props.text && !translateText) {
    text = props.text
  }

  const [imageElements, setImageElements] = useState([]);
  const [lastImageText, setLastImageText] = useState(null);
  const [lastImageGuid, setLastImageGuid] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(false);
  
  const result = "";

  useEffect(() => {
    if (lastImageGuid !== guid) {
      setLastImageText(null);
      setImageElements([]);
    }
  }, [guid]);

  const canSnippet = (value) => {
    return validUrl(value);
  };


  const updateSettings = (blockType, value) => {
    if (blockType == 'link') {
      setLoadingLink(canSnippet(value) ? value : null);
    }
    changeSettings(blockType, value);
  };

  const clickTextTranslate = async () => {
    if (!text) {
      return
    }
    setTextTranslating(true);
    const translated = await translate(text, textLang, "text");

    const {
      onChange,
      order,
      onRotate,
      ...settings
    } = props;
    onChange({
      ...settings,
      ...translated
    });
    setTextTranslating(false);
  }

  const uploadImage = (value) => {
    const imageUrl = value[0];
    setSelectedImage(imageUrl);
  };

  const onCropSave = (value) => {
    updateSettings('image', value);
    setSelectedImage(undefined);
  };

  const onOrderUp = !onRotate ? null : () => {
    onRotate(guid, 1);
  };

  const onOrderDown = !onRotate ? null : () => {
    onRotate(guid, -1);

  };

  // const dispatch = useDispatch();

  // const extractElfsightId = (text) => {
  //   if (!text)
  //     return null;
  //   const startText = '<script src="https://apps.elfsight.com/p/platform.js" defer></script> <div class="';
  //   const endText = '"></div>';
  //   const startFrom = text.indexOf(startText);
  //   console.log(startText)
  //   console.log(startFrom)
  //   let result = text;
  //   if (startFrom === 0)
  //     return null;
  //   result = result.substring(startFrom + startText.length + 1);
  //   const endFrom = result.indexOf(endText);
  //   console.log(endText)
  //   console.log(endFrom)
  //   if (endFrom === 0)
  //     return null;

  //   result = result.substring(0, endFrom);
  //   const {
  //     onChange
  //   } = props;
  //     onChange({
  //       text: result,
  //     })
  //   console.log(text)
    
  // };
  

  return (
    <React.Fragment>


      <div className="block-settings">
        <div className="block-settings__order">
        </div>
        {(text || image) && (
          <div className="block-settings__types">
            {onOrderUp && <Button noStyled onClick={onOrderUp}><Icon type="arrowAltCircleUp" /></Button>}
            <div className="block-settings__preview__empty"></div>
            {onOrderDown && <Button noStyled onClick={onOrderDown}><Icon type="arrowAltCircleDown" /></Button>}
          </div>
        )}
        <br />

        <div className="block-settings__preview">

          <div className="block-settings__types">
            
            <Button
              isInline
              noStyled
              onClick={() => updateSettings('type', BLOCK_PREVIEW)}
            >
              <Icon
                type="magic"
                className={classnames({ 'block-settings__types__selected': type === BLOCK_PREVIEW })}
              />
            </Button>
            {/* <Button
              isInline
              noStyled
              onClick={() => updateSettings('type', BLOCK_TEXT)}
            >
              <Icon
                type="alignCenter"
                className={classnames({ 'block-settings__types__selected': type === BLOCK_TEXT })}
              />
            </Button> */}
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

            {link && (
              <div className="block-settings__settings__animation">
                <Button
                  className={classnames([
                    'block-settings__settings__animation__button',
                    { 'block-settings__settings__animation__button__checked': animation }
                  ])}
                  onClick={() => updateSettings('animation', !animation)}
                  isInline
                  noStyled
                >
                  <Icon type="freeCodeCamp" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {!(type == BLOCK_PREVIEW) ?
          //  область настройки контента  
          <>
            <div className="area-box-for-catalogItems">
              <div className="area-box-for-catalogItems__header">{__("Настройки контента")}</div>
              <div className="block-settings__settings">
                {!translateText && <>
                  <div className="block-settings__settings__field-button"
                    onClick={() => setTranslateText(true)}
                  >
                    {__("Добавить перевод")}
                  </div>
                </>}
                {translateText && <>
                  <div className="block-settings__settings__field-button-off"
                    onClick={() => setTranslateText(false)}
                  >
                    {__("Скрыть переводы")}
                  </div>

                  <div className="advanced-settings-items">
                    <div className="horizontal-picker-lang-buttons">
                      {supportedLanguages.map(lang => <div className="picker__item-lang-buttons">
                        <div className="picker__item-lang-buttons__box" onClick={() => setTextLang(lang)}>
                          {lang != textLang ? <div className="picker__item-lang-buttons__box__content"><p>{lang.toUpperCase()}</p></div> : <div className="picker__item-lang-buttons__box__selected"><p>{lang.toUpperCase()}</p></div>}
                        </div>
                      </div>)}
                    </div>
                  </div>
                </>}

                <Textarea
                  className="block-settings__settings__input"
                  value={text}
                  placeholder={__("Вставь готовый текст")}
                  onChange={(value) => updateSettings('text', value)}
                />

                {translateText && <>
                  <Input
                    className={classnames([
                      'catalogItem-settings__settings__input',
                      { used: Boolean(!textTranslating && text) },
                    ])}
                    type="file"
                    icon="language"
                    onClick={clickTextTranslate}
                  />
                  {!textTranslating ? null :
                    <div className="story-settings__settings__field-header__translate">{__("Подождите, мы переводим ваш текст с")}&nbsp;: {textLang.toUpperCase()}</div>
                  }
                  <br />
                </>}
                <br />

                <Input
                  className={classnames([
                    'block-settings__settings__image pulse1 icon1',
                    { used: Boolean(image) }
                  ])}
                  type="file"
                  icon="image"
                  onChange={(value) => uploadImage(value)}
                  onClick={image ? () => updateSettings('image', undefined) : undefined}
                />
                {!image
                  ? (
                    <div className="catalogItem-settings__settings__field-header"
                    >
                      {__("Нажмите на кнопку, чтобы загрузить изображение")}
                    </div>
                  ) : <div className="catalogItem-settings__settings__field-header"
                  >
                    {__("Нажмите на кнопку, чтобы удалить загруженное изображение")}
                  </div>}
                <br />

                <Input
                  className="block-settings__settings__input"
                  value={link}
                  type="url"
                  placeholder={__("Ссылка (формат https://mysite.com)")}
                  onChange={(value) => updateSettings('link', value)}
                />
                
                <br />


              </div>
              <div className="settings-video-link-box">
                <a href="" target="_blank">
                  <div className="settings-video-link-box__flexbox" style={{ marginLeft: 12 }}>
                    <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                    <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                  </div>
                </a>
              </div>
              <br />
            </div>
            <div className="catalogItem-settings__settings__field-header">
              {__("Область настроек контента")}
            </div>
          </>
          :
          //  область настройки виджета 
          <>
            <div className="area-box-for-catalogItems">
              <div className="area-box-for-catalogItems__header">{__("Добавление виджета")}</div>
              <div className="block-settings__settings">


                <Textarea
                  className="block-settings__settings__input"
                  value={text}
                  placeholder={__("Вставьте фрагмент кода в формате: <div class='elfsight-app-3a7a6cbe-6cc5-40f7-a0f3-d912cced4042'></div>")}
                  onChange={(value) => updateSettings('text', value)}
                />
                {/* <Button onClick={() => extractElfsightId(text)}>получить id</Button> */}
                
                <div className="catalogItem-settings__settings__field-header"
                >
                  {__("Получите код виджета по ссылке: ")}<a href="https://elfsight.io/sweety-widget" target="_blank" rel="noopener noreferrer">https://elfsight.io/sweety-widget</a>
                </div>
              </div>
              <br/>
              <div className="settings-video-link-box">
                <a href="" target="_blank">
                  <div className="settings-video-link-box__flexbox" style={{ marginLeft: 12 }}>
                    <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                    <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                  </div>
                </a>
              </div>
              <br />
            
            {/* <a href="https://elfsight.io/c/2894562/1013901/13113" target="_top" id="1013901"><img src="//a.impactradius-go.com/display-ad/13113-1013901" border="0" alt="Elfsight All-in-One reviews widget" width="100%" height="600"/></a> */}
            </div>
            <div className="catalogItem-settings__settings__field-header">
              {__("Область настроек виджета")}
            </div>
          </>}

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
  onChange: PropTypes.func,
  order: PropTypes.number
};

BlockSettings.defaultProps = {
  type: '',
  link: '',
  text: '',
  image: '',
  animation: false,
  onChange: () => { },
  order: 0
};

export default BlockSettings;

