import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch } from 'react-redux';

import Button from 'components/common/Button';
import Icon from 'components/common/Icon';
import Input from 'components/common/Input';

import { translatedProperty } from 'utils/translation';

import { REMOVE_CATALOG, EDIT_CATALOG } from 'constants/actions';

import './index.scss';

import {
  CATALOG_LEFT,
  CATALOG_CENTER,
  CATALOG_RIGHT,
  CATALOG_HEADER,
} from 'constants/catalogTypes';

const CatalogItem = (props) => {
  const {
    guid,
    animation,
    image,
    price,
    currency,
    number,
    outOfStock,
    timeFrom,
    timeTo,
    type,
    onClick,
    className,
    technical
  } = props;
  const text = translatedProperty(props, "text");
  const textAlt = translatedProperty(props, "textAlt");
  const dispatch = useDispatch();

  const handleLock = (e) => {
    e.stopPropagation();
    if (outOfStock) {
      dispatch({ type: EDIT_CATALOG, payload: { guid, outOfStock: false } });
    };
    if (!outOfStock) {
      dispatch({ type: EDIT_CATALOG, payload: { guid, outOfStock: true } });
    }
  };

  const handleRemoveCatalog = (e) => {
    dispatch({ type: REMOVE_CATALOG, guid });
  };


  switch (type) {

    case CATALOG_LEFT:
    default: {
      const style = {};
      if ((image) && (!price & !number))
        style.backgroundImage = `URL(${image})`;
      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__left',
            { 'catalogItem__left__with-image': image },
            { 'catalogItem__left__with-button': (price || number) },
            { 'catalogItem__left__with-image__with-button': image && (price || number) },
            { 'catalogItem-withimage-wihout-title-left': image && (!price & !number & !text) },
            className
          ])}
          style={style}
          onClick={onClick}
        >
          {image && (price || number) && (
            <img src={image} alt={text} />
          )}
          {(!price && !number) && text && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-left-title-without-button">{text}</div>
            </div>
          )}
          {(text && !textAlt) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{text}</div>
            </div>
          )}
          {(text && textAlt) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem__title">{text}</div>
              <div className="catalogItem-text-en">{textAlt}</div>
            </div>
          )}

          {price && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={() => { }} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                <div className="catalogItem-quantity">0</div>
                <Button isInline noStyled onClick={() => { }} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>
              <div className="catalogItem-price-currency">{price}{'\u00A0'}{currency}</div>
            </div>
          )}
          {number && !price && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem-price-empty"></div>
              <div className="catalogItem-preorder-flex-row">
                <Button isInline noStyled onClick={() => { }} ><Icon type="MinusCircle" className="catalogItem-add-button" /> </Button>
                <div className="catalogItem-quantity">0</div>
                <Button isInline noStyled onClick={() => { }} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button>
              </div>
              <div className="catalogItem-price-empty"></div>
            </div>
          )}
        </div>
      );

      if (outOfStock) {
        return (
          <div>
            <div className="catalogItem-number-item-lock" onClick={handleLock} >
              <Icon type="lock" />
            </div>
            <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div>
            <div className="button-in-catalogItem-left-base">
              <Button className="button-in-catalogItem-left " isPulse={animation} technical={technical}>{catalogItem}</Button>
              <div className="button-in-catalogItem-left-mask"></div>
            </div>
          </div>
        );
      }
      if ((price || number) && !outOfStock && (timeFrom || timeTo)) {
        return (
          <div>
            <div className="catalogItem-number-item-lock"  >
              <Icon type="clock" />
            </div>
            {/* <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div> */}
            <Button className="button-in-catalogItem-left " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }
      if (!outOfStock)
        return (
          <div>
            <div className="catalogItem-number-item" onClick={handleLock}>
              <Icon className="catalogItem-number-item__check" type="check" />
            </div>
            {/* <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div> */}
            <Button className="button-in-catalogItem-left " Sty isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      return catalogItem;
    }


    case CATALOG_CENTER: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__center',
            { 'catalogItem__center__with-image': image },
            { 'catalogItem__center__with-button': (price || number) },
            { 'catalogItem__center__with-image__with-button': image && (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (!price & !number) },
            { 'catalogItem-withimage-wihout-title-center': image && (!price & !number & !text) },
            className
          ])}
          style={style}
          onClick={onClick}
        >
          <div className="catalogItem__title">{text}
            {(price || number) && price && (
              <div className="catalogItem-preorder-flex-column-center">

                <div className="catalogItem-price-currency">{price}{'\u00A0'}{currency}</div>
              </div>
            )}
            {(price || number) && !price && (
              <div className="catalogItem-preorder-flex-column-center">

                <div className="catalogItem-price-empty"></div>
              </div>
            )}
          </div>
        </div>
      );
      if ((price || number) && outOfStock) {
        return (
          <div >
            <div className="catalogItem-number-item-lock" onClick={handleLock}>
              <Icon type="lock" />
            </div>
            <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div>
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }

      if ((price || number) && !outOfStock && (timeFrom || timeTo)) {
        return (
          <div>
            <div className="catalogItem-number-item-lock">
              <Icon type="clock" />
            </div>
            {/* <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div> */}
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }

      if (!outOfStock) {
        return (
          <div >
            <div className="catalogItem-number-item" onClick={handleLock}>
              <Icon className="catalogItem-number-item__check" type="check" />
            </div>
            {/* <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div> */}
            <Button className="button-in-catalogItem-center " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }
      return catalogItem;
    }

    case CATALOG_HEADER: {
      const style = {};
      if (image)
        style.backgroundImage = `URL(${image})`;

      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__center',
            { 'catalogItem__center__with-image': image },
            { 'catalogItem__center__with-image__without-button': (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (price || number) },
            { 'catalogItem__center__with-image__without-button': image && (!price & !number) },
            { 'catalogItem-withimage-wihout-title-center': image && (!price & !number & !text) },
            className
          ])}
          style={style}
          onClick={onClick}
        >
          <div className="catalogItem__title">{text}
          </div>
        </div>
      );
      return catalogItem;
    }


    case CATALOG_RIGHT: {
      const style = {};
      if ((image) && (!price & !number))
        style.backgroundImage = `URL(${image})`;
      const catalogItem = (
        <div
          className={classnames([
            'catalogItem',
            'catalogItem__right',
            { 'catalogItem__right__with-image': image },
            { 'catalogItem__right__with-button': (price || number) },
            { 'catalogItem__right__with-image__with-button': image && (price || number) },
            { 'catalogItem-withimage-wihout-title-right': image && (!price & !number & !text) },
            className
          ])}
          style={style}
          onClick={onClick}
        >
          {image && (price || number) && (
            <img src={image} alt={text} />
          )}
          {(!price && !number) && text && (
            <div className="catalogItem-right-title-without-button">{text}</div>
          )}
          {(text && textAlt) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem__title">{text}</div>
              <div className="catalogItem-text-en">{textAlt}</div>
            </div>
          )}
          {(text && !textAlt) && (price || number) && (
            <div className="catalogItem-preorder-flex-column">
              <div className="catalogItem__title">{text}</div>
            </div>
          )}

          {(price || number) && price && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                <div className="catalogItem-price-currency-right">{price}{'\u00A0'}{currency}</div>
                <Button isInline noStyled onClick={() => { }} >
                  {number ?
                    <Icon type="plusCircle" className="catalogItem-add-button" />
                    : <Icon type="check" className="catalogItem-check-button" />
                  }
                </Button>
              </div>

            </div>
          )}
          {(price || number) && !price && (
            <div className="catalogItem-preorder-flex-column">

              <div className="catalogItem-preorder-flex-row">
                {/* <Button isInline noStyled onClick={() => { }} ><Icon type="plusCircle" className="catalogItem-add-button" /> </Button> */}
              </div>

            </div>
          )}

        </div>

      );

      if ((price || number) && outOfStock) {
        return (
          <div >
            <div className="catalogItem-number-item-lock" onClick={handleLock}>
              <Icon type="lock" />
            </div>
            <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div>
            <Button className="button-in-catalogItem-right " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }
      if ((price || number) && !outOfStock && (timeFrom || timeTo)) {
        return (
          <div>
            <div className="catalogItem-number-item-lock">
              <Icon type="clock" />
            </div>
            {/* <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div> */}
            <Button className="button-in-catalogItem-right " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }
      if (!outOfStock) {
        return (
          <div >
            <div className="catalogItem-number-item" onClick={handleLock}>
              <Icon className="catalogItem-number-item__check" type="check" />
            </div>
            {/* <div className="catalogItem-remove-item" onClick={handleRemoveCatalog} >
              <Icon type="trash" />
            </div> */}
            <Button className="button-in-catalogItem-right " isPulse={animation} technical={technical}>
              {catalogItem}
            </Button>
          </div>
        );
      }
      return catalogItem;
    }
  }
};

CatalogItem.propTypes = {
  animation: PropTypes.bool,
  image: PropTypes.string,
  text: PropTypes.string,
  textAlt: PropTypes.string,
  price: PropTypes.string,
  currency: PropTypes.string,
  number: PropTypes.string,
  outOfStock: PropTypes.bool,
  timeFrom: PropTypes.string,
  timeTo: PropTypes.string,
  type: PropTypes.string,
  technical: PropTypes.bool
};

CatalogItem.defaultProps = {
  animation: false,
  image: undefined,
  text: '',
  textAlt: '',
  price: undefined,
  currency: '',
  number: undefined,
  outOfStock: false,
  timeFrom: '',
  timeTo: '',
  type: undefined,
  technical: false
};

export default CatalogItem;
