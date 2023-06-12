import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import './index.scss';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';
import Payment from 'components/Payment';


const Subscription = () => {
    const [settingsOpened, setSettingsOpened] = useState(false);

    const { active } = useSelector((state) => state.config.account);

    const linkWhatsapp = `https://wa.me/c/34672442251`;
    const openVerifySettings = () => {
        setSettingsOpened(true);
        return false;
    };
    const closeVerifySettings = () => {
        setSettingsOpened(false);
    };


    if (active) {
        return null;
    }

    return (
        <React.Fragment>
            <Button onClick={openVerifySettings} isInline className="icon-header-padding-blink">
                <Icon type="exclamationTriangle" />
            </Button>
            <Slider
                opened={settingsOpened}
                onClose={closeVerifySettings}
                onSubmit={() => setSettingsOpened(false)}
                title={__("ПРИОБРЕСТИ ПОДПИСКУ")}
                subtitle={__("Стоимость использования 9 евро в месяц")}
                // linkWhatsapp={linkWhatsapp}
                // submitTitle={__("ПРИОБРЕСТИ ПОДПИСКУ")}
            >
                <Payment />
                {/* <p>{__("Ваша постоянная ссылка от панели управления:")}<br/>
            <b>{window.location.href}</b></p>
            <p>{__("Активация оплаченной подписки от 1 до 10 часов.")}</p> */}
            </Slider>
        </React.Fragment>
    );
};


export default Subscription;
