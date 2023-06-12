import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';

import Header from 'components/Header';
import {__} from 'utils/translation';
import './index.scss';

import API from 'utils/api';
import history from 'utils/history';
import { getSearchString } from 'utils/url';

const Payments = () => {
  const [referrals, setReferrals] = useState([]);
  const [balance, setBalance] = useState({});
  const { url } = useSelector((state) => state.config);
  const { settingsName } = useSelector((state) => state.config.data);

  useEffect(() => {
    API.getReferrals().then(response => {
      setReferrals(response);
    });
    API.getBalance().then(response => {
      setBalance(response);
    });
  }, []);

  const closePayment = ()=> {
    history.push(`/invitationId=${getSearchString(url, 'invitationId')}`);
  };
  
  const refUrl = `https://sweety.link?ref=${settingsName}`;

  return (
    <React.Fragment>
      <div className="payments-box">
      <Button
        noStyled
        isInline
        className="payment__close"
        onClick={closePayment}
      >
        <Icon type="timesCircle" />
      </Button>
      <div className="payments">
          <Header noConfig />
            <div className="payments__title">{__("КАБИНЕТ ВАШИХ РЕФЕРАЛЬНЫХ ВОЗНАГРАЖДЕНИЙ")}</div>
            <div className="payments__title__span">{__("Рекомендуй конструктор SWEETY PWA CREATOR и зарабатывай 4500 рублей от каждой оплаты. Для этого просто поделитесь своей реферальной ссылкой. Когда твой реферал перейдет по ссылке, ты увидишь его в этом кабинете. Если твой реферал оплатит тариф БИЗНЕС, тебе будет начислено 4500 рублей. Для выведения средств отправь запрос в директ инстаграм для пользователя @pwacreator_ru")}
              <br /><a href={refUrl} target="_blank" rel="noopener noreferrer">{refUrl}</a></div>
            <div className="payments__subtitle">{__("Баланс:")} {balance.balance} {balance.currency}</div>
            <div className="payments__subsubtitle">{__("История транзакций:")}</div>
          <div className="payments__story-box">
            {
              referrals.map((item) => (
                <div className="payments__story-box__items">
                  {item.profitAmount && (
                  <div  className="payments__story-box__items__paid">{__("Ваш реферал:")} <a href={`https://sweety.link/${item.name}`} target="_blank" rel="noopener noreferrer">{item.name}</a></div>)}
                  {!item.profitAmount && (
                  <div>{__("Название приложения:")} <a href={`https://sweety.link/${item.name}`} target="_blank" rel="noopener noreferrer">{item.name}</a></div>)}
                  
                  {item.profitAmount && (
                  <div className="payments__story-box__items__paid">{__("Дата создания:")} {item.createdDate}</div>)}
                  {!item.profitAmount && (
                  <div>{__("Дата создания:")} {item.createdDate}</div>)}
                                    
                  {item.profitAmount && (
                  <div className="payments__story-box__items__paid">{__("Дата оплаты:")} {item.paidDate}</div>)}
                  

                  {item.profitAmount && (
                  <div className="payments__story-box__items__paid">{__("Тариф Бизнес, Ваше вознаграждение:")} {item.profitAmount} {item.profitCurrency}</div>)}
                  {!item.profitAmount && (
                  <div >{__("Тариф бесплатный")}</div>)}


                  {item.withdrawalDate && (
                  <div className="payments__story-box__items__withdrawal">{__("Дата выведения денежных средств:")} {item.withdrawalDate}</div>)}
                  

                  {item.withdrawalMethod && (
                  <div className="payments__story-box__items__withdrawal">{__("Ваши денежные средства были переведены на карту:")} {item.withdrawalMethod}</div>)}
                  
                  {item.withdrawal && (
                  <div className="payments__story-box__items__withdrawal">{__("Сумма перевода:")} {item.withdrawalMethod} {item.profitCurrency}</div>)}

                </div>
              ))
            }
          </div>
        </div>
      </div>
        
    
    </React.Fragment>
  );
};

export default Payments;
