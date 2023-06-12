import React from 'react';
import { useSelector } from 'react-redux';
import Stories from 'components/Stories';
import Header from 'components/Header';
import Avatar from 'components/common/Avatar';
import Title from 'components/Title';
import Messengers from 'components/Messengers';
import Blocks from 'components/Blocks';
import CatalogItems from 'components/CatalogItems';
import Social from 'components/Social';
import Footer from 'components/Footer'
import Publish from 'components/Publish';
import Button from 'components/common/Button';
import SiteFrame from 'components/SiteFrame';
import { __ } from 'utils/translation';
import { getInvite } from 'utils/api';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

const App = () => {
  const { data = {} } = useSelector((state) => state.config);
  const { currentTheme } = useSelector((state) => state.config);
  const { config } = useSelector((state) => state.config);
  const { url } = useSelector((state) => state.config.data);
  const { active } = useSelector((state) => state.config.account);
  
  const linkWhatsapp = __("https://wa.me/34672442251?text=%D0%AF%20%D1%85%D0%BE%D1%87%D1%83%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D1%82%D1%8C%20%D0%BE%D0%BD%D0%BB%D0%B0%D0%B9%D0%BD%20%D0%BC%D0%B5%D0%BD%D1%8E%20SWEETY%2C%20%D0%BD%D0%BE%20%D1%83%20%D0%BC%D0%B5%D0%BD%D1%8F%20%D0%BC%D0%B0%D0%BB%D0%BE%20%D0%B2%D1%80%D0%B5%D0%BC%D0%B5%D0%BD%D0%B8.%20%D0%9C%D0%BD%D0%B5%20%D0%BD%D1%83%D0%B6%D0%BD%D0%B0%20%D0%BF%D0%BE%D0%BC%D0%BE%D1%89%D1%8C%20%D0%B4%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%D0%B5%D1%80%D0%B0.%20%D0%AF%20%D0%B3%D0%BE%D1%82%D0%BE%D0%B2%20%D0%BE%D0%BF%D0%BB%D0%B0%D1%82%D0%B8%D1%82%D1%8C%20120%20%D0%B5%D0%B2%D1%80%D0%BE%20%D0%B7%D0%B0%20%D1%8D%D1%82%D1%83%20%D1%83%D1%81%D0%BB%D1%83%D0%B3%D1%83.")

  const { settings = {} } = data;
  const backgroundStyles = currentTheme.getBackgroundStyles();
  const inviteId = getInvite();

  
  
  
  
  
  return (
    <React.Fragment>
      <Helmet>
      <script src="https://apps.elfsight.com/p/platform.js" defer></script>
      </Helmet>
      
      <div className="app" style={backgroundStyles}>
        <div className="app-container">
          <Header />
          
          <Avatar />
          {inviteId && (
            <SiteFrame url={`${data.url}/admin?invid=${inviteId}`} />
          )}
          <Stories data={data.stories} />
          <CatalogItems data={data.catalogItems} />
          <Title />
          <Blocks data={data.blocks} />
          <Messengers />
          <br/>
          <Footer />
          <Publish url={url} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
