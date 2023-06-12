import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import history from 'utils/history';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import { PDFDownloadLink } from '@react-pdf/renderer';
import SlipDocument from 'components/Payment/SlipDocument';

import './index.scss';

const Slip = () => {
    const { number } = useSelector((state) => state.config.account);

    const [pdfLoaded, setPdfLoaded] = useState(false);
    useEffect(() => {
      setPdfLoaded(true);
    }, []);
  
    return <div className="app-container payment">
        <Button
            noStyled
            isInline
            className="payment__close"
            onClick={() => history.push({ pathname: '/', search: window.location.search })}
        >
            <Icon type="timesCircle" />
        </Button>
        {pdfLoaded && <PDFDownloadLink document={<SlipDocument number={number} />} fileName="slip.pdf">
            {({ loading }) => (loading ? 'Загружаем...' : 'Скачать счет на оплату в размере 9999 рублей, за подключение тарифа "БИЗНЕС" ')}
        </PDFDownloadLink>}
    </div>
}

export default Slip;