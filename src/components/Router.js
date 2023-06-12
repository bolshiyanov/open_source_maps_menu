
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import API from 'utils/api';

import Loading from 'components/common/Loading';
import Payment from 'components/Payment';
import Landing from 'components/Landing';
import App from 'components/App';

import { CONFIG_LOAD } from 'constants/actions';

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    API.updateToken()
      .then(() => {
        dispatch({ type: CONFIG_LOAD });
      });
  }, []); // eslint-disable-line

  const { data = {} } = useSelector((state) => state.config);

  if (!data)
    return <Loading />;

  const counter = data.counter || 0;

  if ( counter < 3)
    return <Landing />;

  return (
    <Switch>
      <Route path="/payment" component={Payment} />
      <Route component={App} />
    </Switch>
  );
};

export default Router;
