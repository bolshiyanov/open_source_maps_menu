import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';
import {__} from 'utils/translation';
import Links from 'components/Links';
import history from 'utils/history';

import { EDIT_MESSENGERS_DATA } from 'constants/actions';

import './index.scss';

const Messengers = () => {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [data, setData] = useState([]);

  const openMessengerSettings = () => {
    setSettingsOpened(true);
  };

  const closeMessengerSettings = () => {
    setSettingsOpened(false);
  };

  const handleChangeItem = (item, value) => {
    setData(data.map((messenger) => (messenger.title === item ? { ...messenger, value } : messenger)));
  };

  const dispatch = useDispatch();
  const applyMessengersSettings = () => {
    dispatch({ type: EDIT_MESSENGERS_DATA, data });
    closeMessengerSettings();
  };

  const { messengers } = useSelector((state) => state.config.data);
  const { active, paymentData } = useSelector((state) => state.config.account);
  useEffect(() => {
    setData(messengers);
  }, [messengers]);

  const filteredMessengers = data.filter((messenger) => messenger.value !== '');

  const showAddButton = filteredMessengers.length === 0;
  //|| (filteredMessengers.length === 1 && filteredMessengers[0].title === 'Instagram');

  return (
    <React.Fragment>

      <div className="messengers">
        {
          filteredMessengers.map((messenger) => (
            <Button
              key={messenger.title}
              className="messenger"
              onClick={openMessengerSettings}
            >
              <Icon type={messenger.icon} />
            </Button>
          ))
        }
        {
          showAddButton && (
            <Button
              key="add-button"
              onClick={openMessengerSettings}
              className={filteredMessengers.length !== 0 ? 'messenger-tech' :
                classnames(['messenger__button', 'tech-button'])}
            >
              <Icon type="plus" />
              {filteredMessengers.length === 0 && (
                <span>{__("Контакты")}</span>
              )}
            </Button>
          )
        }
      </div>

      <Slider
        opened={settingsOpened}
        onClose={closeMessengerSettings}
        title={__("Настройка мессенджеров")}
        onSubmit={applyMessengersSettings}
        subtitle= {__("Для конфиденциальности используйте свой username в телеграм или инстаграм. Чтобы получать заявки на почту подключите свой e-mail. Если вы добавите ссылку на Google Map  и(или) TripAdvisor- у вас появятся соответствующие кнопки. Если вы добавите номер WhatsApp у вас появится кнопка для установки через WhatsApp, а также кнопка зарезервировать столик и кнопка вызвать ВЫЗВАТЬ ОФИЦИАНТА (нужен спциальный QR)")}
      >
        <Links data={data} onChange={handleChangeItem} />
      </Slider>
    </React.Fragment>
  );
};

export default Messengers;
