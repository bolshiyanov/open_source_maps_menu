import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { UPDATE_CONFIG_DATA } from 'constants/actions';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import { __ } from 'utils/translation';
import Slider from 'components/common/Slider';

import ConstructorSettings from './ConstructorSettings';
import './index.scss';




const Constructor = () => {
    const [data, setData] = useState({
        googleAnalytics: '',
    });
    const { googleAnalytics } = useSelector((state) => state.config.data);

    const [settingsOpened, setSettingsOpened] = useState(false);
    const openConstructorSettings = () => {
        setSettingsOpened(true);
        return false;
    };

    useEffect(() => {
        setData({  googleAnalytics});
    }, [googleAnalytics]);

    const onChangeData = useCallback((
         newGoogleAnalytics) => {
        setData({
            googleAnalytics: newGoogleAnalytics
        });
    }, [setData]);

    const closeConstructorSettings = useCallback(() => setSettingsOpened(false), [setSettingsOpened]);
    const dispatch = useDispatch();
    const submitSettings = () => {
        dispatch({
            type: UPDATE_CONFIG_DATA,
            googleAnalytics: data.googleAnalytics,
            
        });
        closeConstructorSettings();
    };

    return (
        <React.Fragment>
            <Button onClick={openConstructorSettings} isInline className="icon-header-padding">
                <Icon type="chartBar" />
            </Button>
            <Slider
                opened={settingsOpened}
                onClose={closeConstructorSettings}
                title={__("Установка Google Analytics")}
                subtitle={__("Отслеживайте работу своего сайта и приложения при помощи идентификатора Google Analytics")}
                onSubmit={submitSettings}
            >
                <ConstructorSettings
                    googleAnalytics={data.googleAnalytics} onChange={onChangeData} />
            </Slider>
        </React.Fragment>
    );
};


export default Constructor;

