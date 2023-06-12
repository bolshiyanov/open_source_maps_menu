import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Input from 'components/common/Input';
import Button from 'components/common/Button';

import Header from 'components/Header';

import { REGISTER_USER } from 'constants/actions';
import { ACCOUNT_STATUS_UNCONFIRMED } from 'constants/accountStatuses';

import backgroundImage from 'images/background.jpg';

const Register = ({ status }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateEmail = useCallback((value) => {
    setEmail(value);
  }, [setEmail]);

  const updatePassword = useCallback((value) => {
    setPassword(value);
  }, [setPassword]);

  const { email: storeEmail } = useSelector((state) => state.config.account);
  useEffect(() => {
    updateEmail(storeEmail);
  }, [storeEmail, updateEmail]);

  const dispatch = useDispatch();
  const handleRegister = () => {
    dispatch({ type: REGISTER_USER, email, password });
  };

  const isUnconfirmedAccount = status === ACCOUNT_STATUS_UNCONFIRMED;

  return (
    <div className="payment__register__container" style={{ backgroundImage: `URL(${backgroundImage})` }}>
      <div className="payment__register">
        <Header noConfig />
        <div className="flex-delimiter" />
        <h1 className="payment__register__header">
          {isUnconfirmedAccount
            ? 'Подтвердите или измените свой email'
            : 'Неограниченный доступ к настройкам и продвижению'}
        </h1>
        <div className="payment__register__subtitle">
          {isUnconfirmedAccount
            ? 'Что бы закончить регистрацию'
            : 'Для лучшего контента и ссылок'}
        </div>
        <div className="payment__register__block">
          <div className="payment__register__item">
            {isUnconfirmedAccount
              ? 'Ранее вы указали email для входа, но не подтвердили его. Повторите ввод и следуйте инструкции, которую мы отправим вам на почту'
              : 'Готовы сделать ВАУ страницу? Введите свой email и придумайте пароль, что бы начать.'}
          </div>
          <div className="payment__register__item">
            <Input
              value={email}
              placeholder="email"
              onChange={updateEmail}
            />
            <Input
              value={password}
              type="password"
              placeholder="password"
              onChange={updatePassword}
            />
            <div className="payment__register__item__agreement">
              {`Нажимая кнопку ${isUnconfirmedAccount ? 'ЗАКОНЧИТЬ РЕГИСТРАЦИЮ' : 'ПОПРОБУЙ СЕЙЧАС'}, вы принимаете `}
              <a href="#">пользовательское соглашение</a>
            </div>
          </div>
        </div>
        <Button
          noStyled
          className="payment__register__button"
          disabled={!email || !password}
          onClick={handleRegister}
        >
          {isUnconfirmedAccount
            ? 'Закончить регистрацию'
            : 'Попробуй сейчас'}
        </Button>
      </div>
    </div>
  );
};

Register.propTypes = {
  status: PropTypes.string
};

Register.defaultProps = {
  status: 'unregistered'
};

export default Register;
