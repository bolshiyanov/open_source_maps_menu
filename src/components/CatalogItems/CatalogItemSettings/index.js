import React, { createElement, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useSelector } from 'react-redux';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea';
import ShowReview from 'components/Review/ShowReview';
import AddOldReview from 'components/Review/AddOldReview';
import Popup from 'components/common/Popup';
import CropImage from 'components/common/CropImage';
import Picker from 'components/common/Picker';
import { __, translatedProperty, translatedPropertyName, supportedLanguages, getDefaultLanguage, translate } from 'utils/translation';
import {
    CATALOG_LEFT,
    CATALOG_CENTER,
    CATALOG_RIGHT,
    CATALOG_HEADER
} from 'constants/catalogTypes';
import { getSearchString } from 'utils/url';

import CatalogItem from '../CatalogItem';
import API from 'utils/api';

import './index.scss';

const CatalogItemSettings = (props) => {
    const [selectedImage, setSelectedImage] = useState(undefined);
    const [translateText, setTranslateText] = useState(false);
    const [translateTextAlt, setTranslateTextAlt] = useState(false);
    const [translateDescription, setTranslateDescription] = useState(false);

    const [textLang, setTextLang] = useState(getDefaultLanguage());
    const [textTranslating, setTextTranslating] = useState(false);

    const [textAltLang, setTextAltLang] = useState(getDefaultLanguage());
    const [textAltTranslating, setTextAltTranslating] = useState(false);

    const [descriptionLang, setDescriptionLang] = useState(getDefaultLanguage());
    const [descriptionTranslating, setDescriptionTranslating] = useState(false);

    const [fullSettingsOpend, setFullSettingsOpend] = useState(false);
    const [additionalSettingsOpend, setAdditionalSettingsOpend] = useState(false);
    const [newReviewInputOpend, setNewReviewInputOpend] = useState(false);

    const [reviewUrl, setReviewUrl] = useState('');
    const [reviewImage, setReviewImage] = useState('');
    const [reviewAuthor, setReviewAuthor] = useState('');
    const [reviewDate, setReviewDate] = useState(new Date().toISOString().replace("T", " ").substring(0, 16));

    const updateSettings = (catalogItemType, value) => {
        const {
            onChange,
            order,
            onRotate,
            ...settings
        } = props;
        if (catalogItemType === "text" && !translateText) {
            var updating = {
                ...settings,
                text: value
            };
            supportedLanguages.forEach(lang => {
                updating[translatedPropertyName("text", lang)] = value;
            });
            onChange(updating);
        } else if (catalogItemType === "text" && translateText) {
            onChange({
                ...settings,
                text: value,
                [translatedPropertyName("text", textLang)]: value
            })
        } else if (catalogItemType.startsWith("text") && !catalogItemType.startsWith("text")) {
            onChange({
                ...settings,
                [catalogItemType]: value
            })
        }

        else if (catalogItemType === "textAlt" && !translateTextAlt) {
            var updating = {
                ...settings,
                textAlt: value
            };
            supportedLanguages.forEach(lang => {
                updating[translatedPropertyName("textAlt", lang)] = value;
            });
            onChange(updating);
        } else if (catalogItemType === "textAlt" && translateTextAlt) {
            onChange({
                ...settings,
                textAlt: value,
                [translatedPropertyName("textAlt", textAltLang)]: value
            })
        } else if (catalogItemType.startsWith("textAlt")) {
            onChange({
                ...settings,
                [catalogItemType]: value
            })
        }

        else if (catalogItemType === "description" && !translateDescription) {
            var updating = {
                ...settings,
                description: value
            };
            supportedLanguages.forEach(lang => {
                updating[translatedPropertyName("description", lang)] = value;
            });
            onChange(updating);
        } else if (catalogItemType === "description" && translateDescription) {
            onChange({
                ...settings,
                description: value,
                [translatedPropertyName("description", descriptionLang)]: value
            })
        } else if (catalogItemType.startsWith("description")) {
            onChange({
                ...settings,
                [catalogItemType]: value
            })
        }

        else {
            onChange({
                ...settings,
                [catalogItemType]: value
            })
        };
    };

    const {
        animation,
        guid,
        image,
        storyGuid,
        order,
        price,
        currency,
        timeFrom,
        timeTo,
        outOfStock,
        number,
        type,
        onChange,
        onRotate
    } = props;

    let text = translatedProperty(props, "text", textLang, true);
    if (!text && props.text && !translateText) {
        text = props.text
    }
    let textAlt = translatedProperty(props, "textAlt", textAltLang, true);
    if (!textAlt && props.textAlt && !translateTextAlt) {
        textAlt = props.textAlt
    }
    let description = translatedProperty(props, "description", descriptionLang, true);
    if (!description && props.description && !translateDescription) {
        description = props.description
    }

    const [imageElements, setImageElements] = useState([]);
    const [lastImageText, setLastImageText] = useState(null);
    const [lastImageGuid, setLastImageGuid] = useState(null);
    const [imagesLoading, setImagesLoading] = useState(false);

    useEffect(() => {
        if (lastImageGuid !== guid) {
            setLastImageText(null);
            setImageElements([]);
        }
    }, [guid]);

    const { stories = {} } = useSelector((state) => state.config.data);
    const storyElements = stories.map((story) => ({
        id: story.title,
        component: (
            <div
                onClick={() => updateSettings('storyGuid', story.guid)}
                className="theme-picker"
                style={{ backgroundImage: `URL(${story.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}
            />
        )
    }));

    const showTitle = stories.length > 0;

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

    const clickTextAltTranslate = async () => {
        if (!textAlt) {
            return
        }
        setTextAltTranslating(true);
        const translated = await translate(textAlt, textAltLang, "textAlt");
        onChange({
            ...props,
            ...translated
        });
        setTextAltTranslating(false);
    }

    const clickDescriptionTranslate = async () => {
        if (!description) {
            return
        }
        setDescriptionTranslating(true);
        const translated = await translate(description, descriptionLang, "description");
        onChange({
            ...props,
            ...translated
        });
        setDescriptionTranslating(false);
    }

    const handleReviewUrl = () => {
        if (!reviewUrl || !reviewImage || !reviewAuthor) {
            return
        }

        if (reviewImage.startsWith("https://sweety.link/content/img")) {
            onChange({
                ...props,
                reviews: props.reviews &&
                    props.reviews.filter(r => r.url?.toLowerCase() === reviewUrl?.toLowerCase()).length > 0 ? props.reviews :
                    (props.reviews ?? []).concat({
                        image: reviewImage,
                        url: reviewUrl,
                        author: reviewAuthor,
                        isActive: true
                    })
            })
            setReviewUrl("")
            setReviewAuthor("")
            setReviewImage("")
            setNewReviewInputOpend(false);
        } else {
            API.uploadImage({
                image: reviewImage
            }).then(res => {
                if (res.imageUrl) {
                    onChange({
                        ...props,
                        reviews: props.reviews &&
                            props.reviews.filter(r => r.url?.toLowerCase() === reviewUrl?.toLowerCase()).length > 0 ? props.reviews :
                            (props.reviews ?? []).concat({
                                image: res.imageUrl,
                                url: reviewUrl,
                                author: reviewAuthor,
                                date: reviewDate,
                                isActive: true
                            })
                    })
                    setReviewUrl("")
                    setReviewAuthor("")
                    setReviewImage("")
                    setNewReviewInputOpend(false);
                }
            })
        }
    }

    const handleReview = (review) => {
        const reviews = props.reviews;
        const updatingReview = reviews.filter(r => r.url === review.url)[0]
        if (updatingReview) {
            updatingReview.isActive = review.isActive;
        }
        onChange({
            ...props,
            reviews: reviews
        })
    }

    const canAddReview = getSearchString(window.location.search, 'demo') === "full";
    // const canAddReview = true;

    return (
        <React.Fragment>
            {!showTitle && (
                <>
                    <div className="catalogItem-settings__settings__field-header-picker-red">{__("Вы не создали ни одного раздела меню. Сначала закройте эту вкладку, а затем создайте новый раздел меню.")}
                    </div>
                    <br />
                    <div className="settings-video-link-box">
                        <a href="" target="_blank">
                            <div className="settings-video-link-box__flexbox" style={{ marginLeft: 12 }}>
                                <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                                <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                            </div>
                        </a>
                    </div>
                    <br />
                </>
            )
            }

            { showTitle && !storyGuid && (
                <>
                    <div className="advanced-settings-catalogItemSettings">
                        <Picker
                            items={storyElements}
                            selected={stories.filter((e) => e.guid === storyGuid)[0]?.title}
                            className="horizontal-picker"
                        />
                        <div className="catalogItem-settings__settings__field-header-picker-red">{__("Нажмите нужный раздел меню. Если такого здесь нет, то сначала закройте эту вкладку, а затем создайте новый раздел меню.")}</div>
                        <br />
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
                </>
            )
            }

            { showTitle && storyGuid && (
                <div>
                    <div className="catalogItem-settings">
                        <div className="catalogItem-settings__preview">
                            <div className="catalogItem-settings__types">
                                <Button
                                    isInline
                                    noStyled
                                    onClick={() => updateSettings('type', CATALOG_LEFT)}
                                >
                                    <Icon
                                        type="alignLeft"
                                        className={classnames({ 'catalogItem-settings__types__selected': type === CATALOG_LEFT })}
                                    />
                                </Button>

                                <Button
                                    isInline
                                    noStyled
                                    onClick={() => updateSettings('type', CATALOG_CENTER)}
                                >
                                    <Icon
                                        type="alignCenter"
                                        className={classnames({ 'catalogItem-settings__types__selected': type === CATALOG_CENTER })}
                                    />
                                </Button>
                                <Button
                                    isInline
                                    noStyled
                                    onClick={() => updateSettings('type', CATALOG_RIGHT)}
                                >
                                    <Icon
                                        type="alignJustify"
                                        className={classnames({ 'catalogItem-settings__types__selected': type === CATALOG_RIGHT })}
                                    />
                                </Button>
                                <Button
                                    isInline
                                    noStyled
                                    onClick={() => updateSettings('type', CATALOG_HEADER)}
                                >
                                    <Icon
                                        type="heading"
                                        className={classnames({ 'catalogItem-settings__types__selected': type === CATALOG_HEADER })}
                                    />
                                </Button>

                                {!(type === CATALOG_HEADER) && (
                                    <div className="catalogItem-settings__settings__animation">
                                        <Button
                                            className={classnames([
                                                'catalogItem-settings__settings__animation__button',
                                                { 'catalogItem-settings__settings__animation__button__checked': animation }
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
                            <div className="preview-area-box-for-catalogItems">
                                <CatalogItem
                                    className="catalogItem-settings__preview__catalogItem"
                                    animation={animation}
                                    image={image}
                                    text={text}
                                    textAlt={textAlt}
                                    price={price}
                                    currency={currency}
                                    number={number}
                                    outOfStock={outOfStock}
                                    timeFrom={timeFrom}
                                    timeTo={timeTo}
                                    type={type}
                                    technical
                                />
                            </div>
                        </div>
                        <div className="catalogItem-settings__settings__field-header">
                            {__("Область предварительного просмотра")}
                        </div>


                        <div className="advanced-settings-catalogItemSettings">
                            <Picker
                                items={storyElements}
                                selected={stories.filter((e) => e.guid === storyGuid)[0]?.title}
                                className="horizontal-picker"
                            />
                            <div className="catalogItem-settings__settings__field-header-picker">{text || __("Это блюдо")}&nbsp;{__("подключается в выделенный раздел меню")}</div>
                        </div>


                        {!fullSettingsOpend ?
                            <>
                                <div className="area-box-for-catalogItems" onClick={() => setFullSettingsOpend(true)}>
                                    <div className="catalogItem-settings-field" >
                                        <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                                        <div className="catalogItem-open-settings-field__span">{__("Основные настройки")}</div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="area-box-for-catalogItems">
                                    <div className="area-box-for-catalogItems__header" onClick={() => setFullSettingsOpend(false)}>{__(" - Основные настройки")}</div>
                                    <div className="catalogItem-settings__settings">

                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={price}
                                            name="fieldPriceCaltalog"
                                            type="number"
                                            placeholder={__("Укажите стоимость за 1 ед.")}
                                            onChange={(value) => updateSettings('price', value)}
                                        />
                                        <div className="catalogItem-settings__settings__field-header">{__("Укажите стоимость за 1 ед.")}</div>
                                        <br />

                                        <Input
                                            className={classnames([
                                                'block-settings__settings__image pulse1 icon1',
                                                { used: Boolean(image) }
                                            ])}
                                            name="fieldImageCaltalog"
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

                                        {!translateText && <>
                                            <div className="catalogItem-settings__settings__field-button"
                                                onClick={() => setTranslateText(true)}
                                            >
                                                {__("Добавить перевод")}
                                            </div>
                                            <Textarea className="catalogItem-settings__settings__input"
                                                value={text}
                                                name="fieldTextCaltalog"
                                                type="text"
                                                placeholder={__("Название блюда или напитка")}
                                                onChange={(value) => updateSettings('text', value)}
                                            />
                                            <div className="catalogItem-settings__settings__field-header">{__("Название блюда или напитка")}</div>
                                            <br />
                                        </>
                                        }



                                        {translateText && <>
                                            <div className="catalogItem-settings__settings__field-button-off"
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

                                            <Textarea className="catalogItem-settings__settings__input"
                                                value={text}
                                                name="fieldTextCatalog"
                                                type="text"
                                                placeholder={__("Название блюда или напитка")}
                                                onChange={(value) => updateSettings('text', value)}
                                            />
                                            <Input
                                                className={classnames([
                                                    'catalogItem-settings__settings__input',
                                                    { used: Boolean(!textTranslating && text) },
                                                ])}
                                                type="file"
                                                icon="language"
                                                onClick={clickTextTranslate}
                                            />
                                            {!textTranslating ?
                                                <div className="settings-video-link-box">
                                                    <a href="https://youtu.be/AVbcZOxSuPE" target="_blank">
                                                        <div className="settings-video-link-box__flexbox">
                                                            <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                                                            <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                                                        </div>
                                                    </a>
                                                </div>
                                                :
                                                <div className="story-settings__settings__field-header__translate">{__("Подождите, мы переводим ваш текст с")}&nbsp;: {textLang.toUpperCase()}</div>
                                            }
                                            <br />
                                        </>
                                        }

                                    </div>

                                    {!translateText ?
                                        <div className="settings-video-link-box">
                                            <a href="" target="_blank">
                                                <div className="settings-video-link-box__flexbox" style={{ marginLeft: 12 }}>
                                                    <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                                                    <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                                                </div>
                                            </a>
                                        </div>
                                        : null}
                                    <br />
                                </div>

                                <div className="catalogItem-settings__settings__field-header">
                                    {__("Область основных настроек")}
                                </div>
                            </>
                        }
                        <br />

                        {!additionalSettingsOpend ?
                            <>
                                <div className="area-box-for-catalogItems" onClick={() => setAdditionalSettingsOpend(true)}>
                                    <div className="catalogItem-settings-field" >
                                        <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                                        <div className="catalogItem-open-settings-field__span">{__("Дополнительные настройки")}</div>
                                    </div>
                                </div>
                            </>
                            : <>
                                <div className="area-box-for-catalogItems">
                                    <div className="area-box-for-catalogItems__header" onClick={() => setAdditionalSettingsOpend(false)}>{__(" - Дополнительные настройки")}</div>
                                    <div className="catalogItem-settings__settings">
                                        {!translateTextAlt && <>
                                            <div className="catalogItem-settings__settings__field-button"
                                                onClick={() => setTranslateTextAlt(true)}
                                            >
                                                {__("Добавить перевод")}
                                            </div>

                                            <Textarea className="catalogItem-settings__settings__input"
                                                value={textAlt}
                                                name="fieldTextAltCaltalog"
                                                type="text"
                                                placeholder={__("Укажите ингредиенты или бренд")}
                                                onChange={(value) => updateSettings('textAlt', value)}
                                            />
                                            <div className="catalogItem-settings__settings__field-header">{__("Укажите ингредиенты или бренд")}</div>
                                            <br />
                                        </>
                                        }

                                        {translateTextAlt && <>
                                            <div className="catalogItem-settings__settings__field-button-off"
                                                onClick={() => setTranslateTextAlt(false)}
                                            >
                                                {__("Скрыть переводы")}
                                            </div>

                                            <div className="advanced-settings-items">
                                                <div className="horizontal-picker-lang-buttons">
                                                    {supportedLanguages.map(lang => <div className="picker__item-lang-buttons">
                                                        <div className="picker__item-lang-buttons__box" onClick={() => setTextAltLang(lang)}>
                                                            {lang != textAltLang ? <div className="picker__item-lang-buttons__box__content"><p>{lang.toUpperCase()}</p></div> : <div className="picker__item-lang-buttons__box__selected"><p>{lang.toUpperCase()}</p></div>}
                                                        </div>
                                                    </div>)}
                                                </div>
                                            </div>

                                            <Textarea className="catalogItem-settings__settings__input"
                                                value={textAlt}
                                                name="fieldTextAltCaltalog"
                                                type="text"
                                                placeholder={__("Укажите ингредиенты или бренд")}
                                                onChange={(value) => updateSettings('textAlt', value)}
                                            />
                                            <Input
                                                className={classnames([
                                                    'catalogItem-settings__settings__input',
                                                    { used: Boolean(!textAltTranslating && textAlt) },
                                                ])}
                                                type="file"
                                                icon="language"
                                                onClick={clickTextAltTranslate}
                                            />
                                            {!textAltTranslating ?
                                                <div className="settings-video-link-box">
                                                    <a href="https://youtu.be/AVbcZOxSuPE" target="_blank">
                                                        <div className="settings-video-link-box__flexbox">
                                                            <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                                                            <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                                                        </div>
                                                    </a>
                                                </div>
                                                :
                                                <div className="story-settings__settings__field-header__translate">{__("Подождите, мы переводим ваш текст с")}&nbsp;: {textAltLang.toUpperCase()}</div>
                                            }
                                            <br />
                                        </>
                                        }


                                        {!translateDescription && <>
                                            <div className="catalogItem-settings__settings__field-button"
                                                onClick={() => setTranslateDescription(true)}
                                            >
                                                {__("Добавить перевод")}
                                            </div>

                                            <Textarea
                                                className="catalogItem-settings__settings__input"
                                                value={description}
                                                name="fieldDescriptionCaltalog"
                                                type="text"
                                                placeholder={__("Укажите вес или емкость, время приготовления блюда, особенности и прочее")}
                                                onChange={(value) => updateSettings('description', value)}
                                            />
                                            <div className="catalogItem-settings__settings__field-header">{__("Укажите вес или емкость, время приготовления блюда, особенности и прочее")}</div>
                                            <br />
                                        </>
                                        }

                                        {translateDescription && <>
                                            <div className="catalogItem-settings__settings__field-button-off"
                                                onClick={() => setTranslateDescription(false)}
                                            >
                                                {__("Скрыть переводы")}
                                            </div>

                                            <div className="advanced-settings-items">
                                                <div className="horizontal-picker-lang-buttons">
                                                    {supportedLanguages.map(lang => <div className="picker__item-lang-buttons">
                                                        <div className="picker__item-lang-buttons__box" onClick={() => setDescriptionLang(lang)}>
                                                            {lang != descriptionLang ? <div className="picker__item-lang-buttons__box__content"><p>{lang.toUpperCase()}</p></div> : <div className="picker__item-lang-buttons__box__selected"><p>{lang.toUpperCase()}</p></div>}
                                                        </div>
                                                    </div>)}
                                                </div>
                                            </div>



                                            <Textarea
                                                className="catalogItem-settings__settings__input"
                                                value={description}
                                                name="fieldDescriptionCaltalog"
                                                type="text"
                                                placeholder={__("Укажите вес или емкость, время приготовления блюда, особенности и прочее")}
                                                onChange={(value) => updateSettings('description', value)}
                                            />
                                            <Input
                                                className={classnames([
                                                    'catalogItem-settings__settings__input',
                                                    { used: Boolean(!descriptionTranslating && description) },
                                                ])}
                                                type="file"
                                                icon="language"
                                                onClick={clickDescriptionTranslate}
                                            />
                                            {!descriptionTranslating ?
                                                <div className="settings-video-link-box">
                                                    <a href="https://youtu.be/AVbcZOxSuPE" target="_blank">
                                                        <div className="settings-video-link-box__flexbox">
                                                            <Icon className="settings-video-link-box__flexbox__icon" type="youtube" />
                                                            <div className="settings-video-link-box__flexbox__text">{__("Нажмите, чтобы посмотреть инструкцию в YouTube")}</div>
                                                        </div>
                                                    </a>
                                                </div>
                                                :
                                                <div className="story-settings__settings__field-header__translate">{__("Подождите, мы переводим ваш текст с")}&nbsp;: {descriptionLang.toUpperCase()}</div>
                                            }
                                            <br />
                                        </>
                                        }


                                        <Input className="catalogItem-settings__settings__input"
                                            value={number}
                                            name="fieldNumberCaltalog"
                                            type="text"
                                            placeholder={__("Артикул")}
                                            onChange={(value) => updateSettings('number', value)}
                                        />
                                        <div className="catalogItem-settings__settings__field-header">{__("Артикул")}</div>
                                        <br />


                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={timeFrom}
                                            name="fieldTimeFromCaltalog"
                                            type="number"
                                            placeholder={__("Время (час) старта продаж")}
                                            onChange={(value) => updateSettings('timeFrom', value)}
                                        />
                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={timeTo}
                                            name="fieldTimeToCaltalog"
                                            type="number"
                                            placeholder={__("Время (час) окончания продаж")}
                                            onChange={(value) => updateSettings('timeTo', value)}
                                        />
                                        <div className="catalogItem-settings__settings__field-header">{__("Продажи в заданные часы")}</div>
                                        <br />

                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={currency}
                                            name="fieldCurrencyCaltalog"
                                            type="text"
                                            placeholder={__("Укажите валюту")}
                                            onChange={(value) => updateSettings('currency', value)}
                                        />
                                        <div className="catalogItem-settings__settings__field-header">{__("Укажите валюту")}</div>
                                        <br />

                                        {(text || image) && (
                                            <div className="catalogItem-settings__types">
                                                {/* {onOrderUp && <div className="catalogItem-settings__types__box-buttons"><Button noStyled onClick={onOrderUp}><Icon type="arrowAltCircleUp" /></Button></div>} */}
                                                <Button
                                                    className={classnames([
                                                        'catalogItem-settings__settings__animation__store',
                                                        { 'catalogItem-settings__settings__animation__store__checked': outOfStock }
                                                    ])}
                                                    onClick={() => updateSettings('outOfStock', !outOfStock)}
                                                    isInline
                                                    noStyled
                                                >
                                                    {outOfStock ? __("Нет в наличии") : __("Есть в наличии")}
                                                </Button>
                                                {/* {onOrderDown && <div className="catalogItem-settings__types__box-buttons"><Button noStyled onClick={onOrderDown}><Icon type="arrowAltCircleDown" /></Button></div>} */}
                                            </div>
                                        )}

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
                                    {__("Область дополнительных настроек")}
                                </div>
                            </>
                        }
                        <br />
                        <AddOldReview />

                        {!canAddReview ? null : !newReviewInputOpend ?
                            <>
                                <div className="area-box-for-catalogItems" onClick={() => setNewReviewInputOpend(true)}>
                                    <div className="catalogItem-settings-field" >
                                        <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                                        <div className="catalogItem-open-settings-field__span">{__("Добавить новый отзыв")}</div>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <div className="area-box-for-catalogItems">
                                    <div className="area-box-for-catalogItems__header" onClick={() => setNewReviewInputOpend(false)}>{__(" - Добавить новый отзыв")}</div>
                                    <div className="catalogItem-settings__settings">
                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={reviewUrl}
                                            name="fieldReviewCaltalog"
                                            type="text"
                                            placeholder='https://www.instagram.com/p/*'
                                            onChange={(value) => setReviewUrl(value)}
                                        />
                                        <div className="catalogItem-settings__settings__field-header">{__("Вставьте URL поста в Инстаграме. Для этого найдите нужный пост, нажмите ... над фотографией, затем нажмите КОПИРОВАТЬ ССЫЛКУ")}</div>
                                        <br/>
                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={reviewImage}
                                            name="fieldReviewCaltalog"
                                            type="text"
                                            placeholder='https://url-foto-in-internet.com'
                                            onChange={(value) => setReviewImage(value)}
                                        />
                                        <div className="catalogItem-settings__settings__field-header">{__("")}</div>
                                        <br/>
                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={reviewAuthor}
                                            name="fieldReviewCaltalog"
                                            type="text"
                                            placeholder='@author'
                                            onChange={(value) => setReviewAuthor(value)}
                                        />
                                        <Input
                                            className="catalogItem-settings__settings__input"
                                            value={reviewDate}
                                            name="fieldReviewCaltalog"
                                            type="text"
                                            placeholder='yyy-MM-dd HH:mm'
                                            onChange={(value) => setReviewDate(value)}
                                        />
                                    </div>
                                    <br />
                                    <Button noStyled className="catalogItem-close-settings-field" onClick={() => handleReviewUrl()}>{__("Import")}</Button>
                                </div>
                            </>
                        }
                        <br />
                    </div>
                </div>
            )}

            {/* <ShowReview reviews={props.reviews} onChange={handleReview} /> */}



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
        </React.Fragment >
    );
};

CatalogItemSettings.propTypes = {
    animation: PropTypes.bool,
    image: PropTypes.string,
    text: PropTypes.string,
    description: PropTypes.string,
    textAlt: PropTypes.string,
    storyGuid: PropTypes.string,
    order: PropTypes.number,
    price: PropTypes.string,
    currency: PropTypes.string,
    timeFrom: PropTypes.string,
    timeTo: PropTypes.string,
    outOfStock: PropTypes.bool,
    number: PropTypes.string,
    type: PropTypes.string,
    onChange: PropTypes.func,

};

CatalogItemSettings.defaultProps = {
    animation: false,
    image: '',
    text: '',
    description: '',
    textAlt: '',
    storyGuid: '',
    order: 0,
    price: '',
    currency: '',
    timeFrom: '',
    timeTo: '',
    outOfStock: false,
    number: '',
    type: 'preview-text',
    onChange: () => { },

};

export default CatalogItemSettings;

