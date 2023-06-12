import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';
import classnames from 'classnames';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import InputGroup from 'components/common/Input/InputGroup';
import Input from 'components/common/Input';
import Popup from 'components/common/Popup';
import CropImage from 'components/common/CropImage';
import addedMenu from 'images/addedmenu.jpg';
import { __, translatedProperty, translatedPropertyName, supportedLanguages, getDefaultLanguage, translate } from 'utils/translation';
import { validUrl } from 'utils/url';
import { getGDocId } from 'utils/googleDoc';
import API from 'utils/api';
import Textarea from 'components/common/Textarea';
import { IMPORT_CATALOG } from 'constants/actions';
import { CATALOG_LEFT, CATALOG_CENTER, CATALOG_RIGHT, CATALOG_HEADER } from 'constants/catalogTypes';

import './index.scss';
import { template } from 'lodash'; 
import templates from "constants/storyTemplates.json";

const StorySettings = (props) => {
  const [selectedImage, setSelectedImage] = useState(undefined);
  const { currentTheme } = useSelector((state) => state.config);
  const [loadingLink, setLoadingLink] = useState(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [withOutTemplateStart, setWithOutTemplateStart] = useState(false);
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [importing, setImporting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const dispatch = useDispatch();

  const [titleLang, setTitleLang] = useState(getDefaultLanguage());
  const [titleTranslating, setTitleTranslating] = useState(false);

  const [fullSettingsOpend, setFullSettingsOpend] = useState(true);
  const [importOpend, setImportOpend] = useState(false);
  const [exportOpend, setExportOpend] = useState(false);

  const { stories } = useSelector((state) => state.config.data);
  const [translateTitle, setTranslateTitle] = useState(false);
  const { catalogItems = [] } = useSelector((state) => state.config.data);

  const {
    guid,
    image,
    onChange,
    onImport,
    order,
    onRotate,
    ...settings
  } = props;
  var title = translatedProperty(props, "title", titleLang, true);
  if (!title && props.title && !translateTitle) {
    title = props.title
  }

  const changeSettings = (storyType, value) => {
    if (storyType === "title" && !translateTitle) {
      const updating = {
        ...settings,
        title: value
      };
      supportedLanguages.forEach(lang => {
        updating[translatedPropertyName("title", lang)] = value;
      });
      onChange(updating);
    } else if (storyType === "title" && translateTitle) {
      onChange({
        ...settings,
        title: value,
        [translatedPropertyName("title", titleLang)]: value
      });
    } else if (storyType.startsWith("title")) {
      onChange({
        ...settings,
        [storyType]: value
      })
    }
    else onChange(
      {
        ...settings,
        [storyType]: value
      })
  };

  const handleImport = async (docId) => {
    if (!docId) {
      return;
    }
    setImporting(true);
    const itemStories = stories;
    const rows = await API.getGoogleSpreadSheet(docId);
    setTimeout(() => {
      const items = rows.filter(row => row.type?.trim() !== "0" && row.type?.trim() !== "" &&
        (row.textEn || row.image)).map(row => {
          const number = row.number?.trim();
          const itemImage = !number ? null : catalogItems.filter(item => item.number === number)[0]?.image;
          const itemAudio = !number ? null : catalogItems.filter(item => item.number === number)[0]?.audio;
          return {
            guid: uuid(),
            number: number,
            price: row.price?.trim(),
            currency: row.currency?.trim(),
            number: row.number?.trim(),
            type: row.type?.trim() == "1" ? CATALOG_LEFT :
              row.type?.trim() == "3" ? CATALOG_RIGHT :
                row.type?.trim() == "4" ? CATALOG_HEADER : CATALOG_CENTER,
            timeFrom: row.timeFrom?.trim(),
            timeTo: row.timeTo?.trim(),
            textEn: row.textEn?.trim(),
            textRu: row.textRu?.trim(),
            textEs: row.textEs?.trim(),
            textDe: row.textDe?.trim(),
            textFr: row.textFr?.trim(),
            textIt: row.textIt?.trim(),
            textZh: row.textZh?.trim(),
            textAltEn: row.textAltEn?.trim(),
            textAltRu: row.textAltRu?.trim(),
            textAltEs: row.textAltEs?.trim(),
            textAltDe: row.textAltDe?.trim(),
            textAltFr: row.textAltFr?.trim(),
            textAltIt: row.textAltIt?.trim(),
            textAltZh: row.textAltZh?.trim(),
            descriptionEn: row.descriptionEn?.trim(),
            descriptionRu: row.descriptionRu?.trim(),
            descriptionEs: row.descriptionEs?.trim(),
            descriptionDe: row.descriptionDe?.trim(),
            descriptionFr: row.descriptionFr?.trim(),
            descriptionIt: row.descriptionIt?.trim(),
            descriptionZh: row.descriptionZh?.trim(),
            storyGuid: guid,
            image: row.image?.toLowerCase() === "si" && row.story ? itemStories[parseInt(row.story?.trim()) - 1]?.image :
              row.image?.startsWith("https://") ? row.image : itemImage,
            audio: itemAudio
          };
        });
      items.forEach((item, index) => {
        item.order = items.length - index - 1;
      });

      const storyRow = rows.filter(row => row.type?.trim() === "0")[0];
      if (storyRow) {
        onImport({
          image: storyRow.image ?? image,
          titleEn: storyRow.textEn?.trim(),
          titleRu: storyRow.textRu?.trim(),
          titleEs: storyRow.textEs?.trim(),
          titleDe: storyRow.textDe?.trim(),
          titleFr: storyRow.textFr?.trim(),
          titleIt: storyRow.textIt?.trim(),
          titleZh: storyRow.textZh?.trim(),
        });
      } else {
        onImport({});
      }

      dispatch({ type: IMPORT_CATALOG, items, storyGuid: guid });

      setImporting(false);
      setGoogleSheetUrl("");
    }, 1000);
  };

  const handleExport = async (docId) => {
    if (!docId) {
      return;
    }

    setExporting(true);
    try {
      const sheet = await API.getGoogleSpreadSheetById(docId, "0");
      const range = `${sheet.a1SheetName}!2:${sheet.rowCount - 1}`
      await sheet._spreadsheet.axios.post(`/values/${encodeURIComponent(range)}:clear`);
      sheet.resetLocalCache(true);

      const storyRow = {
        type: "0",
        image,
      }
      supportedLanguages.forEach(lang => {
        storyRow[translatedPropertyName("text", lang)] = props[translatedPropertyName("title", lang)] ?? props.title ?? "";
      })

      const items = catalogItems.filter(item => item.storyGuid === guid)
        .sort((a, b) => b.order - a.order)
        .map(item => {
          const exporting = {
            price: item.price?.trim() ?? "",
            currency: item.currency?.trim() ?? "",
            number: item.number?.trim() ?? "",
            type: item.type?.trim() === CATALOG_LEFT ? "1" :
              item.type?.trim() === CATALOG_RIGHT ? "3" :
                item.type?.trim() == CATALOG_HEADER ? "4" : "2",
            timeFrom: item.timeFrom?.trim() ?? "",
            timeTo: item.timeTo?.trim() ?? "",
            image: item.image ?? ""
          }
          supportedLanguages.forEach(lang => {
            exporting[translatedPropertyName("text", lang)] = item[translatedPropertyName("text", lang)] ?? "";
            exporting[translatedPropertyName("textAlt", lang)] = item[translatedPropertyName("textAlt", lang)] ?? "";
            exporting[translatedPropertyName("description", lang)] = item[translatedPropertyName("description", lang)] ?? "";
          })
          return exporting;
        });
      await sheet.addRows([storyRow].concat(items));

      setExporting(false);
      setGoogleSheetUrl("");
    } catch (e) {
      setExporting(false);
      console.log(e);
    }
  }

  const canSnippet = (value) => {
    return validUrl(value);
  };

  const updateSettings = (storyType, value) => {
    if (storyType == 'video') {
      setLoadingLink(canSnippet(value) ? value : null);
    }

    changeSettings(storyType, value);
  };

  const uploadImage = (value) => {
    const imageUrl = value[0];
    setSelectedImage(imageUrl);
  };
  const onCropSave = (value) => {
    updateSettings('image', value);
    setSelectedImage(undefined);
  };

  const onOrderLeft = !onRotate ? null : () => {
    onRotate(guid, 1);
  };

  const onOrderRight = !onRotate ? null : () => {
    onRotate(guid, -1);
  };

  const clickTitleTranslate = async () => {
    if (!title) {
      return
    }
    setTitleTranslating(true);
    const translated = await translate(title, titleLang, "title");
    onChange({
      ...settings,
      ...translated
    });
    setTitleTranslating(false);
  }

  return (

    <React.Fragment>
      <div className="story-settings">
        {/* {image && (
          <div className="story-settings__types">
            {onOrderLeft && <Button noStyled onClick={onOrderLeft}><Icon type="arrowAltCircleLeft" /></Button>}
            <div className="story-settings__preview__empty"></div>
            {onOrderRight && <Button noStyled onClick={onOrderRight}><Icon type="arrowAltCircleRight" /></Button>}
          </div>
        )}
        <br /> */}

        {(title || image || withOutTemplateStart) ?
          (
            <>
              {!fullSettingsOpend ?
                <>
                  <div className="area-box-for-catalogItems" onClick={() => setFullSettingsOpend(true)}>
                    <div className="catalogItem-settings-field" >
                      <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                      <div className="catalogItem-open-settings-field__span">{__("Основные настройки")}</div>
                    </div>
                  </div>
                  <br />
                </>
                :
                <>
                  <div className="area-box-for-catalogItems">
                    <div className="area-box-for-catalogItems__header" onClick={() => setFullSettingsOpend(false)}>{__(" - Основные настройки")}</div>
                    <div className="story-settings__settings">
                      {!translateTitle
                        ? (
                          <>
                            <div className="story-settings__settings__field-button"
                              onClick={() => setTranslateTitle(true)}
                            >
                              {__("Добавить перевод")}
                            </div>

                            <Textarea
                              className="story-settings__settings__input"
                              value={title}
                              name="fieldTitleStory"
                              placeholder={__("Напиши название для раздела меню*")}
                              onChange={(value) => updateSettings('title', value)}
                            />
                            <div className="story-settings__settings__field-header">{__("Напиши название для раздела меню*")}</div>
                            <br />
                          </>) :

                        (<>
                          <div className="story-settings__settings__field-button-off"
                            onClick={() => setTranslateTitle(false)}
                          >
                            {__("Скрыть переводы")}
                          </div>

                          <div className="advanced-settings-stories">
                            <div className="horizontal-picker-lang-buttons">

                              {supportedLanguages.map(lang => <div className="picker__item-lang-buttons">
                                <div className="picker__item-lang-buttons__box" onClick={() => setTitleLang(lang)}>
                                  {lang != titleLang ? <div className="picker__item-lang-buttons__box__content"><p>{lang.toUpperCase()}</p></div> : <div className="picker__item-lang-buttons__box__selected"><p>{lang.toUpperCase()}</p></div>}
                                </div>
                              </div>)}
                            </div>
                          </div>


                          <Textarea className="story-settings__settings__input"
                            value={title}
                            name="fieldTitleEnStory"
                            type="text"
                            placeholder={__("Напиши название для раздела меню*")}
                            onChange={(value) => updateSettings('title', value)}
                          />
                          <Input
                            className={classnames([
                              'story-settings__settings__input',
                              { used: Boolean(!titleTranslating && title) },
                            ])}
                            type="file"
                            icon="language"
                            onClick={clickTitleTranslate}
                          />

                          {!titleTranslating ?
                            <div className="story-settings__settings__field-header">{__("Напиши название для раздела меню*")}&nbsp;: {titleLang.toUpperCase()}</div> :
                            <div className="story-settings__settings__field-header__translate">{__("Подождите, мы переводим ваш текст с")}&nbsp;: {titleLang.toUpperCase()}</div>
                          }
                          <br />
                        </>)
                      }
                      <div className='picters-item'>

                        <Input
                          className={classnames([
                            'block-settings__settings__image pulse1 icon1',
                            { used: Boolean(image) }
                          ])}
                          type="file"
                          icon="images"
                          onChange={(value) => uploadImage(value)}
                          onClick={image ? () => updateSettings('image', undefined) : undefined}
                        />
                        {!image
                          ? (
                            <div className="story-settings__settings__field-header"
                            >
                              {__("Нажмите на кнопку, чтобы загрузить изображение")}
                            </div>
                          ) : <div className="story-settings__settings__field-header"
                          >
                            {__("Нажмите на кнопку, чтобы удалить загруженное изображение")}
                          </div>}
                      </div>
                      <div className="image-preview-box">
                        <div className="image-preview-box__storis-left" style={{ backgroundImage: `URL(${addedMenu})` }} />
                        <div className="image-preview-box__storis-empty" />
                        <div className="image-preview-box__storis-center" style={{ backgroundImage: `URL(${image || addedMenu})` }} />
                        <div className="image-preview-box__storis-empty" />
                        <div className="image-preview-box__storis-right" style={{ backgroundImage: `URL(${addedMenu})` }} />
                      </div>
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
                    {__("Область основных настроек")}
                  </div>
                  <br />
                </>
              }


              {!importOpend ?
                <>
                  <div className="area-box-for-catalogItems" onClick={() => setImportOpend(true)}>
                    <div className="catalogItem-settings-field">
                      <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                      <div className="catalogItem-open-settings-field__span">{__("Импорт каталога")}</div>
                    </div>
                  </div>
                  <br />
                </>
                :
                <>
                  <div className="area-box-for-catalogItems">
                    <div className="area-box-for-catalogItems__header" onClick={() => setImportOpend(false)}>{__(" - Импорт каталога")}</div>
                    <div className="story-settings__settings">
                      <Input
                        className="story-settings__settings__input"
                        name="fieldTitleGoogleCaltalog"
                        value={googleSheetUrl}
                        type="text"
                        placeholder="Google SpreadSheet"
                        onChange={(value) => setGoogleSheetUrl(value)}
                      />
                      {!importing && <Button className="import-submit" isInline noStyled onClick={() => handleImport(getGDocId(googleSheetUrl))}>{__("Импортировать")}</Button>}
                      {importing && <div>{__("Каталог импортируется...")}</div>}
                    </div>

                    <div className="settings-video-link-box" >
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
                    {__("Область импорта каталога")}
                  </div>
                  <br />
                </>
              }

              {!exportOpend ?
                <>
                  <div className="area-box-for-catalogItems" onClick={() => setExportOpend(true)}>
                    <div className="catalogItem-settings-field" >
                      <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                      <div className="catalogItem-open-settings-field__span">{__("Экспорт каталога")}</div>
                    </div>
                  </div>
                  <br />
                </>
                :
                <>
                  <div className="area-box-for-catalogItems">
                    <div className="area-box-for-catalogItems__header" onClick={() => setExportOpend(false)}>{__(" - Экспорт каталога")}</div>
                    <div className="story-settings__settings">
                      <Input
                        className="story-settings__settings__input"
                        name="fieldTitleGoogleCaltalog"
                        value={googleSheetUrl}
                        type="text"
                        placeholder="Google SpreadSheet"
                        onChange={(value) => setGoogleSheetUrl(value)}
                      />

                      {!exporting && <Button className="import-submit" isInline noStyled onClick={() => handleExport(getGDocId(googleSheetUrl))}>{__("Экспортировать")}</Button>}
                      {exporting && <div>{__("Каталог экспортируется...")}</div>}
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
                    {__("Область экспорта каталога")}
                  </div>

                  <br />
                </>}



              {(!title && !image) ?
                <>
                  <div className="area-box-for-catalogItems" onClick={() => setWithOutTemplateStart(false)}>
                    <div className="catalogItem-settings-field" >
                      <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                      <div className="catalogItem-open-settings-field__span">{__("НАЧАТЬ С ПОМОЩЬЮ ШАБЛОНА")}</div>
                    </div>
                  </div>
                </> :
                null
              }

            </>) :
          (<>
            <div className="area-box-for-catalogItems">
              <div className="area-box-for-catalogItems__header" onClick={() => setWithOutTemplateStart(true)}>{__(" - ВЫБЕРИ ШАБЛОН")}</div>
              <div className="stories-settings">
                <div className="stories-settings-picker">
                  <div className="stories-settings-picker__empty">

                    {templates.map(template =>
                      <div key={template.id} className="stories-settings-picker-item">
                        <div className="stories-settings-picker-item-flexbox">
                          <div className="stories-settings-picker-item-flexbox__box" onClick={() => handleImport(template.docId)} style={{ backgroundImage: `URL(${template.imageUrl})` }} />
                          {!importing ?
                            <Button className="stories-settings-picker-item-flexbox__title" isInline noStyled onClick={() => handleImport(template.docId)}>{__("Импортировать")}<br />{translatedProperty(template, "name")}</Button>
                            :
                            <Button className="stories-settings-picker-item-flexbox__title" isInline noStyled onClick={() => { }}>{__("Каталог импортируется...")}</Button>
                          }
                        </div>
                      </div>)
                    }

                  </div>
                </div>
              </div>
              <div className="settings-video-link-box">
                <a href="https://youtu.be/UPKl7Xqh65A" target="_blank">
                  <div className="settings-video-link-box__flexbox" style={{ marginLeft: 12 }}>
                    <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                    <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                  </div>
                </a>
              </div>

              <br />
            </div>
            <div className="catalogItem-settings__settings__field-header">
              {__("Область выбора шаблонов")}
            </div>
            <br />
            <div className="area-box-for-catalogItems" onClick={() => setWithOutTemplateStart(true)}>
              <div className="catalogItem-settings-field" >
                <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                <div className="catalogItem-open-settings-field__span">{__("НАЧАТЬ БЕЗ ШАБЛОНА")}</div>
              </div>
            </div>
          </>)}
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

StorySettings.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,

  video: PropTypes.string,

  actionTimeout: PropTypes.string,
  price: PropTypes.string,
  currency: PropTypes.string,
  cta: PropTypes.string,
  linkUrl: PropTypes.string,

  onChange: PropTypes.func,
  showDescription: PropTypes.bool,
  order: PropTypes.number
};

StorySettings.defaultProps = {
  title: '',
  image: '',
  description: '',

  video: '',

  actionTimeout: '',
  price: '',
  currency: '',
  cta: '',
  linkUrl: '',
  showDescription: false,

  onChange: () => { },
  order: 0
};

export default StorySettings;

