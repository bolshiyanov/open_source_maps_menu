import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import { __, translatedProperty } from 'utils/translation';
import copy from 'clipboard-copy';
import './index.scss';
import { getSearchParams } from 'utils/url';
import arrow from 'images/arrow.png';

const AddOldReview = () => {
    const [reviewField, setReviewField] = useState(false);
    const [reviewCopied, setReviewCopied] = useState(false);
    const [wasCopied, setWasCopied] = useState(false);

    const { messengers } = useSelector((state) => state.config.data);

    let instagram = messengers.filter(e => e.title === "Instagram")[0]?.value?.toLowerCase();
    const instagramUrl = "instagram.com/"
    if (instagram && instagram.includes(instagramUrl)) {
        instagram = instagram.substring(instagram.indexOf(instagramUrl) + instagramUrl.length)
    }

    const review = `@${instagram} , @sweety_pwa`;

    const onCopy = () => {
        copy(review);
        setWasCopied(true);
        setReviewCopied(true);
        setTimeout(() => setReviewCopied(false), 2000);
    };
    return (
        <>
            {instagram && (
                <>
                    {!reviewField ?
                        <div className="area-box-for-catalogItems" onClick={() => setReviewField(true)}>
                            <div className="catalogItem-settings-field" >
                                <Icon className="catalogItem-open-settings-field__icon" type="plusCircle" />
                                <div className="catalogItem-open-settings-field__span">{__("Импорт отзывов")}</div>
                            </div>
                        </div>

                        :

                        <div className="area-box-for-catalogItems">
                                    <div className="area-box-for-catalogItems__header" onClick={() => setReviewField(false)}>{__(" - Импорт отзывов")}</div>
                            <div className="review-field__title">{__("Отзывы из вашего Инстаграм будут размещены в вашем QR меню")}</div>
                            <div className="review-field__subtitle">{__("ШАГ 1: Скопируйте эту подпись, чтобы добавить в комментарий к старому посту о вашем ресторане")}<br />
                                <span>{review}</span>
                            </div>

                            <div className="review-botton-box">
                                <Button className="review-botton" noStyled
                                    onClick={onCopy} >
                                    {reviewCopied ? __("Текст скопирован") :
                                        <input className='review-botton__linkrenderer' value={review} readOnly={true} />}
                                </Button>
                                {!wasCopied ?
                                    <div className="review-botton-box__arrow" style={{ backgroundImage: `URL(${arrow})` }}></div> : null}
                            </div>
                            {!wasCopied ?
                                <div className="review-field__under-botton__noactive">{__("Нажмите, чтобы скопировать эту подпись")}</div>
                                :
                                <div className="review-field__under-botton">{__("Нажмите, чтобы скопировать эту подпись")}</div>
                            }

                            <div className="review-field__subtitle">{__("ШАГ 2: Найдите пост в вашей ленте или у ваших подписчиков. Установите подпись в комментарий к этому посту. Если этот пост в чужом Инстаграм, то комментарий должен установить владелец аккаунта Инстаграм. Попросите его об этой услуге.")}<br />
                            </div>

                            {!wasCopied ?
                                <><Button className="review-botton__noactive" noStyled
                                    onClick={() => { }} >
                                    {__("ОТКРЫТЬ ИНСТАГРАМ")}
                                </Button>
                                    <div className="review-field__under-botton">{__("Сначала скопируйте текст для подписи")}</div>
                                </>
                                :
                                <>
                                    <Button className="review-botton" noStyled 
                                        onClick={() => window.open('https://www.instagram.com', '_blank')} >
                                        {__("ОТКРЫТЬ ИНСТАГРАМ")}
                                    </Button>
                                    <div className="review-field__under-botton">{__("Нажмите, чтобы открыть ваш Инстаграм")}</div>
                                </>
                            }

                            <div className="review-field__subtitle">{__("ШАГ 3: Мы получим уведомление на @sweety_pwa. В течении 24 часа ваш отзыв будет добавлен к этому блюду и размещен в поиске по ресторанам. Услуга платная. Один отзыв стоит 0.5 €. Первые 20 отзывов бесплатно. Попробуйте это сейчас!")}<br />
                            </div>
                            <br/>
                        </div>
                        
                    }
                    <br />
                </>
            )}
        </>
    );
};

export default AddOldReview;