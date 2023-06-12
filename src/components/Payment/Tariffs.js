import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import Icon from 'components/common/Icon';
import Button from 'components/common/Button';
import { __ } from 'utils/translation';

const Tariffs = () => {
  const [tariff, setTariff] = useState({});
  const linkEnter = (window.location.href);
  const { paymentData } = useSelector((state) => state.config.account);

  const tariffs = [
    { guid: "1", title: "Cafe", currency: "€", price: "0.00", advanced: null },
    { guid: "2", title: "Pizza", currency: "€", price: "9.00", advanced: ["dish", "orders"] },
    { guid: "3", title: "Restaurant", currency: "€", price: "19.00", advanced: ["dish", "orders", "payments", "analitycs"] }
  ]

  useEffect(() => {
    if (Object.keys(tariff).length === 0) {
      const currentTariff = tariffs[1] || tariffs[0] || {};
      setTariff(currentTariff);
    }
  }, [tariffs, tariff]);

  const selectTariff = (item) => {
    setTariff(item);
  };

  const linkWhatsapp = `https://wa.me/34672442251?text=${__("Хочу оплатить подписку на Sweety, моя панель управления находится по адресу:")} ${linkEnter}`;
  const linkWhatsapp1 = `https://wa.me/34672442251?text=${__("Хочу получить полностью готовое qr меню за 120 euro")} ${linkEnter}`;
  const linkWhatsapp2 = `https://wa.me/34672442251?text=${__("Хочу заказать рекламу для ресторана в Google за 40 евро в месяц")} ${linkEnter}`;

  

  return (
    <React.Fragment>
      <div className="tariffs">
        <Button
          className="tariffs__button"
          noStyled
          onClick={() => window.open(linkWhatsapp, "_blank")}
        >
          {__("Отключить рекламу в моем qr меню за 9 евро в месяц")}
        </Button>
        <Button
          className="tariffs__button"
          noStyled
          onClick={() => window.open(linkWhatsapp1, "_blank")}
        >
          {__("Хочу заказать рекламу для ресторана в Google за 40 евро в месяц")}
        </Button>
        <Button
          className="tariffs__button pulse"
          noStyled
          onClick={() => window.open(linkWhatsapp2, "_blank")}
        >
          {__("Хочу получить полностью готовое qr меню за 120 euro")}
        </Button>
        <a href="https://elfsight.io/c/2894562/1088027/13113" target="_blank" id="1088027"><img src="//a.impactradius-go.com/display-ad/13113-1088027" border="0" alt="" width="100%" height="auto"/></a>
      </div>
    </React.Fragment>
  );
};

export default Tariffs;
