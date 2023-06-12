import React from 'react';
import PropTypes from 'prop-types';
import { __ } from 'utils/translation';
import Input from 'components/common/Input';
import './index.scss';

const ConstructorSettings = ({
    googleAnalytics,
    onChange
}) => (
    <div className="constructor-settings">
        <p>{__("Установите в это поле только идентификатор вашего скрипта Google Analytics. Пример правильного идентификатора:UA-163327153-1")}<br/>
        <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" >https://analytics.google.com/</a></p>
        <Input
            value={googleAnalytics}
            type="text"
            name="ConstructorSettings"
            placeholder={"UA-XXXXXXXXXX-X"}
            onChange={(value) => onChange(value)}
        />
       
        
    </div>
);

ConstructorSettings.propTypes = {
    googleAnalytics: PropTypes.string,
    onChange: PropTypes.func
};

ConstructorSettings.defaultProps = {
    googleAnalytics: '',
    onChange: () => { }
};

export default ConstructorSettings;