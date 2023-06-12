import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Swiper from 'react-id-swiper';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Loading from 'components/common/Loading';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';
import { HIDE_LANDING } from 'constants/actions';
import logoSweety from 'images/logo512.jpg';
import slide1 from 'images/slide1.jpg';
import slide2 from 'images/slide2.jpg';
import slide3 from 'images/slide3.jpg';
import slide4 from 'images/slide4.jpg';
import slide5 from 'images/slide5.jpg';
import slide6 from 'images/slide6.jpg';
import slide7 from 'images/slide7.jpg';
import slide8 from 'images/slide8.jpg';
import slide9 from 'images/slide9.jpg';
import slide10 from 'images/slide10.jpg';
import slide11 from 'images/slide11.jpg';
import slide12 from 'images/slide12.jpg';
import slide13 from 'images/slide13.jpg';
import slide14 from 'images/slide14.jpg';
import slide15 from 'images/slide15.jpg';
import slide16 from 'images/slide16.jpg';
import slide17 from 'images/slide17.jpg';
import slide18 from 'images/slide18.jpg';
import slide19 from 'images/slide19.jpg';
import slide20 from 'images/slide20.jpg';
import slide21 from 'images/slide21.jpg';
import slide22 from 'images/slide22.jpg';
import slide23 from 'images/slide23.jpg';
import slide24 from 'images/slide24.jpg';
import slide25 from 'images/slide25.jpg';
import slide26 from 'images/slide26.jpg';
import slide27 from 'images/slide27.jpg';


import finger from 'images/left-right.gif';

import 'swiper/swiper.scss';

const Landing = () => {
    const [swiper, setSwiper] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [settingsOpened, setSettingsOpened] = useState(false);
    const dispatch = useDispatch();

    const linkEnter = (window.location.href);
    const linkWhatsapp = __("https://wa.me/34672442251?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%20%D0%9C%D0%B5%D0%BD%D1%8F%20%D0%B7%D0%BE%D0%B2%D1%83%D1%82%20_______%20%D1%8F%20%D0%B8%D0%B7%20%D0%B3%D0%BE%D1%80%D0%BE%D0%B4%D0%B0%20_______.%20%20%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%BF%D0%BE%D0%B4%D1%80%D0%BE%D0%B1%D0%BD%D0%B5%D0%B5%20%D0%BE%20%D1%82%D0%BE%D0%BC%2C%20%D0%BA%D0%B0%D0%BA%20%D0%B2%D0%BD%D0%B5%D0%B4%D1%80%D0%B8%D1%82%D1%8C%20Sweety%20%D0%B2%20%D0%BD%D0%B0%D1%88%D0%B5%D0%BC%20%D1%80%D0%B5%D1%81%D1%82%D0%BE%D1%80%D0%B0%D0%BD%D0%B5%20%D0%B8%20%D0%BA%D0%B0%D0%BA%20%D1%8F%20%D0%BC%D0%BE%D0%B3%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D0%B7%D0%B0%20%D1%8D%D1%82%D0%BE%20120%20%D0%B5%D0%B2%D1%80%D0%BE.")
    const linkWhatsappRecovery = __("https://wa.me/34672442251?text=Если вы своевременно прошли регистрацию, то ссылка от вашей панели управления находится в этом чате. Отправьте это сообщение, чтобы войти в чат и найти ссылку. Если вы переустанавливали WhatsApp вы могли потерять ссылку. В таком случае напишите нам в свободной форме просьбу о восстановлении пароля в этом же чате.")
    const [starters2, setStarters2] = useState(true);

    const onStarters2 = () => {
        setStarters2(false);
    };

    const openLandingSettings = () => {
        setSettingsOpened(true);
        return false;
    };
    const closeLandingSettings = () => {
        setSettingsOpened(false);
    };


    useEffect(() => {
        if (swiper) {
            swiper.on('slideChange', () => {
                setCurrentPage(swiper.realIndex);
            });
            swiper.on('touchEnd', () => {
                setTimeout(() => {
                    if (swiper.isEnd) {
                        swiper.destroy();
                        dispatch({ type: HIDE_LANDING });
                    }
                }, 1000);
            });
        }
    }, [swiper]);

    const handleClick = useCallback(() => {
        if (swiper) {
            swiper.slideNext(500, () => {
                if (swiper.isEnd) {
                    swiper.destroy();
                    dispatch({ type: HIDE_LANDING });
                }
            });
        }
    }, [swiper]);

    return (
        <React.Fragment>
            <div className="main-page">
                <Swiper getSwiper={setSwiper}>
                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide1})` }}>
                        <div className="main-page__page1__container1">

                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("ОНЛАЙН МЕНЮ SWEETY")}</h1>
                                </div>
                            </div>
                            <h2 className="main-page__page1__subtitle">
                                {__("Теперь давайте создадим онлайн меню. Это бесплатно, кредитная карта не потребуется. Регистрация не нужна. Потребуется 3 минуты.")}
                                <br /><b>{__("Листайте дальше, чтобы узнать больше")}</b></h2>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide2})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("SWEETY на 94% быстрее аналогов")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide3})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("SWEETY PWA OFFLINE")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide4})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Большие картинки и описание")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide5})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Стоимость заказа мгновенно")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide6})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Статистика по официантам")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide7})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Оплаты без терминала")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide8})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Автоматически получайте заявки")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide9})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Доставка еды на дом")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide10})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Заказы на вынос")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide11})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Бронирование стола")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide12})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Мультиязычное меню")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide13})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Вирусный маркетинг")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide14})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Посетители из соцсетей")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide15})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Google карты")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide16})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Удобный способ связи")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide17})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Актуальное расписание")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide18})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Акции, события, мероприятия")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide19})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Самый простой интерфейс в мире")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide20})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Добавляйте новые блюда")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide21})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Нет в наличии")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide22})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Завтраки или ужин")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide23})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Генератор QR кодов")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide24})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Google таблицы для удобства")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide25})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Google Аналитика")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={handleClick} className="main-page__page1" style={{ backgroundImage: `URL(${slide26})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Тарифы и цены")}</h1>
                                </div>
                            </div>

                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="arrowAltCircleRight" className="main-page__page1__container1__forward-button-right__icon" />
                            </Button>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                        </div>
                    </div>

                    <div onClick={() => window.open(linkEnter, "_self")} className="main-page__page1" style={{ backgroundImage: `URL(${slide27})` }}>
                        <div className="main-page__page1__container1">
                            <div className="main-page__page1__container1__flexBox">
                                <div className="logo-sweety" style={{ backgroundImage: `URL(${logoSweety})` }} />
                                <div className="main-page__page1__container1__flexBox__header">
                                    <h1 className="main-page__page1__header">{__("Ты маркетолог ресторана?")}</h1>
                                </div>
                            </div>
                            <h2 className="main-page__page1__subtitle">
                                {__("Ты получишь 120 евро и поможешь своему ресторану продавать больше. Хочешь? Нажми кнопку!")}<br />
                                <br /><b>{__("Это последний слайд")}</b></h2>
                            <Button onClick={() => { }} noStyled isInline className="main-page__page1__container1__forward-button-left">
                                <Icon noStyled type="arrowAltCircleLeft" className="main-page__page1__container1__forward-button-left__icon" />
                            </Button>
                            <Button onClick={() => window.open(linkEnter, "_self")} noStyled isInline className="main-page__page1__container1__forward-button-right">
                                <Icon noStyled type="timesCircle" className="main-page__page1__container1__forward-button-right-red__icon" />
                            </Button>
                        </div>

                    </div>


                    <div className="main-page__page">
                        <Loading />
                    </div>
                </Swiper>

                {currentPage < 27 && (
                    <div className="main-page__footer">
                        <div className="main-page__pages">
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 0 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 1 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 2 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 3 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 4 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 5 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 6 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 7 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 8 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 9 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 10 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 11 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 12 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 13 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 14 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 15 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 16 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 17 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 18 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 19 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 20 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 21 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 22 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 23 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 24 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 25 })} />
                            <div className={classnames({ 'main-page__pages__selected': currentPage === 26 })} />

                        </div>

                        {currentPage === 26 ?
                            (<Button
                                noStyled
                                onClick={() => window.open(linkWhatsapp, "_blank")}
                            >
                                {__("ХОЧУ ПОЛУЧИТЬ 120 ЕВРО")}
                            </Button>
                            ) :
                            (
                                <>
                                    <Button
                                        noStyled
                                        onClick={() => window.open(linkEnter, "_self")}
                                    >
                                        {__("СОЗДАТЬ ОНЛАЙН МЕНЮ")}
                                    </Button>
                                    <div className="landing-button-box">
                                        <div className="landing-button-box__recovery"
                                            noStyled
                                            onClick={openLandingSettings}
                                        >
                                            {__("ВОССТАНОВИТЬ ДОСТУП")}
                                        </div>
                                    </div>
                                </>)
                        }


                    </div>
                )}
                {starters2 ? (<div className="popup-is-starters2"
                    onClick={onStarters2}
                    onTouchStart={onStarters2}
                    onTouchMove={onStarters2}
                    style={{ backgroundImage: `URL(${finger})`, }} />) : ""}




            </div>
            <div className="flexBox-slider">
                <Slider
                    opened={settingsOpened}
                    onClose={closeLandingSettings}
                    // onSubmit={() => setSettingsOpened(false)}
                    title={__("ВОССТАНОВЛЕНИЕ ДОСТУПА")}
                    subtitle={__("ВЫ СМОЖЕТЕ ВОССТАНОВИТЬ ДОСТУП К СВОЕЙ ПАНЕЛИ УПРАВЛЕНИЯ ЕСЛИ ВЫ СВОЕВРЕМЕННО ПРОШЛИ РЕГИСТРАЦИЮ ЧЕРЕЗ WHATSAPP")}
                    submitTitle={__("ВОССТАНОВИТЬ ДОСТУП")}
                    linkWhatsapp={linkWhatsappRecovery}


                >
                    <div className="main-page__verify">{__("Нажмите кнопку, чтобы открыть ваш чат в Whatsapp")}</div>
                    <div className="main-page__verify">{__("Посмотрите весь чат в WhatsApp, чтобы найти ссылку на вашу панель управления")}</div>
                    <div className="main-page__verify">{__("Если вы не нашли ссылку на вашу панель управления, отправьте запрос через Whatsapp. Услуга по восстановлению может быть платной. Стоимость от 0 до 20 евро. Рекомендуем вам своевременно проходить регистрацию и хранить вашу секретную ссылку в надежном месте.")}</div>
                    <br />

                </Slider>
            </div>
            <div className="footer-brends-box-items-position-absolut">
            <div className="footer-brends-box-items">
                <div className="brends-items"><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
                <div className="brends-items"><IonIcon size="small" icon={logoApple} /></div>
                <div className="brends-items"><IonIcon size="small" icon={logoAndroid} /></div>
                <div className="brends-items"><IonIcon size="amall" icon={logoWindows} /></div>
            </div>
                </div>

        </React.Fragment >
    );
};


export default Landing;
