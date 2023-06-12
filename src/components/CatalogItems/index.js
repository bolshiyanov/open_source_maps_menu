import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { uuid } from 'uuidv4';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Slider from 'components/common/Slider';
import history from 'utils/history';
import {__} from 'utils/translation';
import { EDIT_CATALOG, REMOVE_CATALOG, ROTATE_CATALOG } from 'constants/actions';

import CatalogItemSettings from './CatalogItemSettings';
import CatalogItem from './CatalogItem';

import './index.scss';

const emptySettings = {
  animation: false,
  guid: null,
  image: '',
  text: '',
  description: '',
  textAlt: '',
  storyGuid: null,
  order: null,
  price: '0',
  currency: '',
  timeFrom: '',
  timeTo: '',
  outOfStock: false,
  number: '',
  type: 'preview-text',
};

const CatalogItems = ({ data }) => {
  const [settingsOpened, setSettingsOpened] = useState(null);
  const [catalogItemData, setСatalogItemData] = useState(emptySettings);
  const [currency, setCurrency] = useState(null);

  const closeCatalogItemsSettings = () => {
    setSettingsOpened(null);
  };

  const onOpenCatalogItemSettings = (catalogItemId) => {
    setSettingsOpened(catalogItemId);
  };

  const dispatch = useDispatch();
  const submitSettings = () => {
    if (catalogItemData.text || catalogItemData.image)
      dispatch({ type: EDIT_CATALOG, payload: catalogItemData });
    if (currency !== catalogItemData.currency) {
      catalogItems.forEach(item => {
        dispatch({ type: EDIT_CATALOG, payload: {...item, currency: catalogItemData.currency} });
      });
    }
    closeCatalogItemsSettings();
  };

  const { active, paymentData } = useSelector((state) => state.config.account);

  const { catalogItems } = useSelector((state) => state.config.data);
  const { storyGuid } = useSelector((state) => state.config);

  useEffect(() => {
    const currentCatalogItem = catalogItems.find((catalogItem) => catalogItem.guid === settingsOpened);
    const settings = currentCatalogItem || { ...emptySettings };
    if (!settings.guid) {
      settings.guid = uuid();
      settings.currency = catalogItems.filter(e => e.currency)[0]?.currency ?? "";
    }
    setCurrency(settings.currency);
    setСatalogItemData({ ...settings });
  }, [settingsOpened, catalogItems]);

  const onRotate = (guid, order) => {
    dispatch({ type: ROTATE_CATALOG, guid, order });
  };

  const removeCatalog = () => {
    dispatch({ type: REMOVE_CATALOG, guid: catalogItemData.guid });
    closeCatalogItemsSettings();
  };

  return (
    <React.Fragment>
      <div className="catalogItems">
        <Button
          key="add-button"
          onClick={() => onOpenCatalogItemSettings('')}
          className={classnames(['catalogItem-button', 'tech-button'])}
        >
          <Icon type="plus" />
          <span>{__("Блюда")}</span>
        </Button>
        </div>
        {
          data.filter(item => !item.storyGuid || item.storyGuid === storyGuid)
            .sort((a, b) => b.order - a.order).map((catalogItem) => <CatalogItem onClick={() => onOpenCatalogItemSettings(catalogItem.guid)}
            key={catalogItem.guid} {...catalogItem} />)
        }
        
      <Slider
        opened={settingsOpened !== null}
        onClose={closeCatalogItemsSettings}
        onRemoveDown={removeCatalog}
        title= {__("Добавление еды и напитков")}
        subtitle= {__("ВАЖНО! СНАЧАЛА СОЗДАВАЙТЕ РАЗДЕЛЫ МЕНЮ, ЗАТЕМ ДОБАВЛЯЙТЕ ЭТУ ЕДУ В НУЖНЫЕ РАЗДЕЛЫ! ")}
        onSubmit={submitSettings}
      >
        <CatalogItemSettings {...catalogItemData}  onRotate={onRotate} onChange={(settings) => setСatalogItemData({ ...catalogItemData, ...settings })} />
      </Slider>

    </React.Fragment >
  );
};

CatalogItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({}))
};

CatalogItems.defaultProps = {
  data: []
};

export default CatalogItems;
