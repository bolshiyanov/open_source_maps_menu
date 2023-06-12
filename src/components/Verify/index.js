import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import './index.scss';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';
import { NavigateBeforeSharp } from '@material-ui/icons';


const Verify = () => {
    const [settingsOpened, setSettingsOpened] = useState(false);
    
    const { active } = useSelector((state) => state.config.account);

    const linkWhatsapp = `https://wa.me/34672442251?text=Sweety-Restaurant%20control%20panel%3A ${window.location.href}`;
    const openVerifySettings = () => {
        setSettingsOpened(true);
        return false;
    };
    const closeVerifySettings = () => {
        setSettingsOpened(false);
    };

    return (
        <React.Fragment>
            <Button onClick={openVerifySettings} isInline className="icon-header-profile">
                <Icon type="user" />
            </Button>
            <Slider
                opened={settingsOpened}
                onClose={closeVerifySettings}
                onSubmit={() => setSettingsOpened(false)}
                title={__("Панель управления")}
                subtitle={__("Регистрация и восстановление доступа к панели управления с помощью WhatsApp")}
                linkWhatsapp={linkWhatsapp}
                submitTitle={__("Регистрация, восстановление доступа")}
            > 
            <p>{__("Мы отправим вам постоянную ссылку для этой панели управления.")}</p>
            <p>{__("Внимание!!! Это секретная ссылка, только администратор ресторана может использовать эту ссылку.")}</p>
            </Slider>
        </React.Fragment>
    );
};


export default Verify;
