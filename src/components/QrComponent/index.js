import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import './index.scss';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';
import Input from 'components/common/Input';
import classnames from 'classnames';
import QRCode from "qrcode.react";


const QrComponent = () => {
    const { avatar, url } = useSelector((state) => state.config.data);
    const demoUrl = `${url}?${__("стол")}`;
    const urlParametrs = `${url}?${__("стол")}&`;


    const [settingsOpened, setSettingsOpened] = useState(false);
    const openQrComponentSettings = () => {
        setSettingsOpened(true);
        return false;
    };
    const closeQrComponentSettings = () => {
        setSettingsOpened(false);
    };
    const [pdfLoaded, setPdfLoaded] = useState(false);
    useEffect(() => {
        setPdfLoaded(true);
    }, []);

    const [parametrs, setParametrs] = React.useState('');

    const linkWhatsapp = "https://wa.me/c/34672442251"


    const downloadQR = () => {
        const canvas = document.getElementById("AppUrl");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "AppUrl.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const downloadQRDemo = () => {
        const canvas = document.getElementById("WebUrl");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "WebUrl.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const downloadQRParametrs = () => {
        const canvas = document.getElementById("paramUrl");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "urlParametrs.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <React.Fragment>
            <Button onClick={openQrComponentSettings} isInline className="icon-header-padding">
                <Icon type="qrcode" />
            </Button>
            <Slider
                opened={settingsOpened}
                onClose={closeQrComponentSettings}
                onSubmit={() => setSettingsOpened(false)}
                title={__("QR коды для визиток и столов")}
                subtitle={__("На этой вкладке вы сможете сгенерировать qr коды для вашего ресторана")}
            >
                <div className="qrComponents-flexBox">
                
                <br />
                    <QRCode
                        id="AppUrl"
                        value={url}
                        size={290}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        imageSettings={{
                            src: "https://dash.sweety.link/logo512.png",
                            x: null,
                            y: null,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                    />
                    <div className="qrComponents-flexBox__box">
                        <p>{__("Эту ссылку и QR код нужно размещать на ваших бизнес карточках, рекламных материалах и в качестве последней фотографии для публикации в социальные сети")}</p>
                        <p className="linkQr">{url}</p>
                        <a onClick={downloadQR}>{__("СКАЧАТЬ ЭТОТ QR КОД")}</a>
                    </div>
                </div>
                {/* <div className="qrComponents-flexBox">
                    <QRCode
                        id="WebUrl"
                        value={demoUrl}
                        size={290}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        imageSettings={{
                            src: "https://dash.sweety.link/logo512.png",
                            x: null,
                            y: null,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                    />
                    <div className="qrComponents-flexBox__box">
                        <p>{__("Эта ссылка и Qr код предназначены для новых клиентов. Рекомендуется использовать эту ссылку в рекламных кампаниях и размещать ее в своих соцсетях. Ссылка ведет на открытие вашего веб сайта (Лендинга).")}</p>
                        <p className="linkQr">{demoUrl}</p>
                        <a onClick={downloadQRDemo}>{__("СКАЧАТЬ ЭТОТ QR КОД")}</a>
                    </div>
                </div> */}
                <div className="qrComponents-flexBox">
                
                <br />
                    <QRCode
                        id="paramUrl"
                        value={urlParametrs + parametrs}
                        size={290}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        imageSettings={{
                            src: "https://dash.sweety.link/logo512.png",
                            x: null,
                            y: null,
                            height: 40,
                            width: 40,
                            excavate: true,
                        }}
                    />
                    <div className="qrComponents-flexBox__box">
                        <input className="qrComponents-flexBox__box__input"
                            type='text'
                            id='parametrs'
                            placeholder={__("Укажите номер столика")}
                            maxLength="20"
                            value={parametrs}
                            onChange={(e) => setParametrs(e.target.value)} />
                        <p>{parametrs}</p>
                        <p>{__("Это QR код нужно размещать на каждый столик. Если ваш клиент отсканирует этот QR код в его меню на телефоне появится кнопка ВЫЗВАТЬ ОФИЦИАНТА. Чтобы правильно использовать эту возможность, необходимо создать QR в котором есть номер стола.")}</p>
                        <p className="linkQr">{urlParametrs}{parametrs}</p>
                        <a onClick={downloadQRParametrs}>{__("СКАЧАТЬ ЭТОТ QR КОД")}</a>
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
                    <Button
                        key="orderQr-button"
                        className={classnames(['order-button'])}
                        onClick={() => window.open(linkWhatsapp, "_blank")} >
                        {__("Заказать QR коды")}
                    </Button>
                    <br/>
                </div>

                {/* {pdfLoaded && <PDFDownloadLink document={<SlipDocument />} fileName="slip.pdf">
                    {({ loading }) => (loading ? 'Загружаем...' : __("СКАЧАТЬ QR КОД НА УСТАНОВКУ ВАШЕГО ПРИЛОЖЕНИЯ"))}
                </PDFDownloadLink>} */}
            </Slider>
        </React.Fragment>
    );
};


export default QrComponent;
