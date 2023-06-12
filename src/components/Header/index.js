import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import QrComponent from 'components/QrComponent';
import Constructor from 'components/Constructor';
import Verify from 'components/Verify';
import FileArchive from 'components/FileArchive';
import Subscription from 'components/Subscription';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';
import Button from 'components/common/Button';
import Picker from 'components/common/Picker';
import { __ } from 'utils/translation';
import history from 'utils/history';

import { CHANGE_THEME } from 'constants/actions';

import './index.scss';

const Header = ({ noConfig, avatar: propsAvatar, name: propsName, className }) => {
  const [configOpened, setConfigOpened] = useState(false);

  const { counter } = useSelector((state) => state.config.data);
  const [preOpened, setPreOpened] = useState(counter <= 4);
  const { active } = useSelector((state) => state.config.account);

  const closeConfig = () => {
    setConfigOpened(false);
  };

  const openConfig = () => {
    setConfigOpened(true);
  };

  const openPayment = () => {
    history.push('/payment');
  };

  const { themes, currentTheme } = useSelector((state) => state.config);

  const dispatch = useDispatch();

  const onChangeTheme = (name) => {
    dispatch({ type: CHANGE_THEME, name });
  };
  const themesElements = themes.map((theme) => ({
    id: theme.name,
    component: (
      <div
        onClick={() => onChangeTheme(theme.name)}
        style={theme.getThemePreviewStyles()}
        className="theme-picker"
      />
    )
  }));
  useEffect(() => {
    if (preOpened) {
      setPreOpened(false);
      setConfigOpened(true);
    }
  }, [preOpened]);

  const onShare = () => {
    navigator.share({
      title: "MENU ONLINE SWEETY", // Заголовок
      text: __("Поделись с друзьями этим конструктором меню онлайн для ресторанов и кафе"), // Текст
      url: 'https://dash.sweety.link', // ссылка
    });
  };


  return (
    <React.Fragment>
      <header className={className}>
        <span className="flex-delimiter" />
        {!noConfig && (
          <React.Fragment>
            {counter < 4 && (
              <Button onClick={openConfig} isInline className="pulse orange icon-header-padding">
                <Icon type="slidersH" />
              </Button>
            )}
            {counter > 3 && (
              <Button onClick={openConfig} isInline className="pulse icon-header-padding">
                <Icon type="slidersH" />
              </Button>
            )}
            <QrComponent />
            <FileArchive />
            <Constructor />
            <Subscription />
            <Verify />
          </React.Fragment>
        )}
      </header>
      {!noConfig && counter > 3 && (
        <Slider
          opened={configOpened}
          title={__("Настройки")}
          onSubmit={closeConfig}
        >
          <div className="advanced-settings">

            <h4>{__("Выбор темы")}</h4>
            <Picker
              items={themesElements}
              selected={currentTheme.name}
              className="horizontal-picker"
            />

            <br />
          </div>
        </Slider>
      )}

      {!noConfig && counter < 4 && (
        <Slider
          opened={configOpened}
          emptyBox={true}
          title={<div onClick={openConfig} isInline
            className="pulse orange icon-header-padding" >
            <div className="orange icon-header-padding__text-b">{__("Настройки")}</div>&nbsp;&nbsp;
            <Icon type="slidersH" />
          </div>}
          onSubmit={closeConfig}

        >

          <div className="advanced-settings">

            <h4>{__("Выбор темы")}</h4>
            <Picker
              items={themesElements}
              selected={currentTheme.name}
              className="horizontal-picker"
            />

            <br />
          </div>
        </Slider>
      )}

    </React.Fragment>
  );
};

Header.propTypes = {
  noConfig: PropTypes.bool,
  avatar: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string
};

Header.defaultProps = {
  noConfig: false,
  avatar: undefined,
  name: undefined,
  className: undefined
};

export default Header;
