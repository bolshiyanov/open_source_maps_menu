import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';
import Links from 'components/Links';
import {__} from 'utils/translation';
import { EDIT_SOCIAL_DATA } from 'constants/actions';

import './index.scss';

const Social = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [data, setData] = useState([]);

  const openSocialSettings = () => {
    setSettingsOpened(true);
  };

  const closeSocialSettings = () => {
    setSettingsOpened(false);
  };

  const handleChangeSocial = (itemTitle, value) => {
    setData(data.map((item) => (item.title === itemTitle ? { ...item, value } : item)));
  };

  const dispatch = useDispatch();
  const applySocialSettings = () => {
    dispatch({ type: EDIT_SOCIAL_DATA, data });
    closeSocialSettings();
  };

  const { social } = useSelector((state) => state.config.data);

  const filteredSocial = data.filter((item) => item.value !== '');

  useEffect(() => {
    setData(social);
  }, [social]);

  const showAddButton = filteredSocial.length === 0;

  return (
    <React.Fragment>
      <div className="social">
        {
          filteredSocial.map((item) => (
            <Button
              key={item.title}
              className="social__item"
              onClick={openSocialSettings}
            >
              <Icon type={item.icon} />
            </Button>
          ))
        }
        {
          showAddButton && (
            <Button
              key="add-button"
              onClick={openSocialSettings}
              className={filteredSocial.length !== 0 ? 'social__item-tech' :
                classnames(['social__button', 'tech-button'])}
            >
              <Icon type="plus" />
              {filteredSocial.length === 0 && (
                <span>{__("Cоцсети")}</span>
              )}
            </Button>
          )
        }
      </div>

      <Slider
        opened={settingsOpened}
        onClose={closeSocialSettings}
        title={__("Настройка соцсетей")}
        onSubmit={applySocialSettings}
      >
        <Links data={data} onChange={handleChangeSocial} />
      </Slider>
    </React.Fragment>
  );
};

export default Social;
