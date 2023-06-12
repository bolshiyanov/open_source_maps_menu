import React from 'react';
import { IonIcon } from '@ionic/react';
import { logoPwa, logoApple, logoAndroid, logoWindows } from 'ionicons/icons';
import { __ } from 'utils/translation';
import './index.scss';
const Footer = () => {

  return (
    <React.Fragment>
      <footer>
      
        <div className="footer-brends-box-items">
          <div className="brends-items"><IonIcon className="footer-brends-box-items-icon-icon" icon={logoPwa} /></div>
          <div className="brends-items"><IonIcon size="small" icon={logoApple} /></div>
          <div className="brends-items"><IonIcon size="small" icon={logoAndroid} /></div>
          <div className="brends-items"><IonIcon size="amall" icon={logoWindows} /></div>
        </div>
        <div className="textlogofooter1">ONLINE MENU &reg; SWEETY</div>
      </footer>
      
    </React.Fragment>
  );
};

export default Footer;

