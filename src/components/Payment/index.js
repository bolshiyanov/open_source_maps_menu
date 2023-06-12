import React from 'react';
import { useSelector } from 'react-redux';

import history from 'utils/history';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import { ACCOUNT_STATUS_REGISTERED, ACCOUNT_STATUS_DEMO } from 'constants/accountStatuses';

import Register from './Register';
import Tariffs from './Tariffs';

import './index.scss';

const Payment = () => {
  const { status, active } = useSelector((state) => state.config.account);

  if (status === ACCOUNT_STATUS_REGISTERED && active) {
    history.push({
      pathname: '/',
      search: window.location.search
    });
  }

  return (
    <div className="app-container payment">
      <Button
        noStyled
        isInline
        className="payment__close"
        onClick={() => history.push({ pathname: '/', search: window.location.search })}
      >
        <Icon type="timesCircle" />
      </Button>
      {status === ACCOUNT_STATUS_REGISTERED || status === ACCOUNT_STATUS_DEMO ? <Tariffs /> : <Register status={status} />}
    </div>
  );
};

export default Payment;
