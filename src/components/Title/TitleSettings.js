import React from 'react';
import PropTypes from 'prop-types';
import {__} from 'utils/translation';
import Input from 'components/common/Input';
import Textarea from 'components/common/Textarea'; 
import './index.scss';

const TitleSettings = ({
  title,
  description,
  onChange
}) => (
  <div className="title-settings"> 
    <p>{__("Заголовок- это самая суть вашего приложения. Рекомендуется использовать не более трех слов.")}</p>
    <Input
      value={title}
      type="text"
      name="TitleInTitleSettings"
      placeholder={__("Заголовок")}
      onChange={(value) => onChange(value, description )}
    />
    <br/>
    <p>{__("Описание- это разъяснение для вашего заголовка. Напишите о том, какую выгоду получает пользователь. Не более 8 слов.")}</p>
    <Textarea
      value={description}
      type="text"
      name="DescriptionsInTitleSettings"
      placeholder={__("Описание")}
      onChange={(value) => onChange(title, value )}
    />
  </div>
);

TitleSettings.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onChange: PropTypes.func
};

TitleSettings.defaultProps = {
  title: '',
  description: '',
  onChange: () => {}
};

export default TitleSettings;
