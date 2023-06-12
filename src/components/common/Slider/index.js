import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {__} from 'utils/translation';
import Icon from 'components/common/Icon';
import Button from 'components/common/Button';

import './index.scss';

const Slider = ({
  opened,
  onClose,
  onSubmit,
  onRemove,
  onRemoveDown,
  title,
  subtitle,
  submitTitle,
  sms,
  link,
  onShare,
  linkWhatsapp,
  hasPhone,
  children
}) => (
  <div className={classnames(['slider-container' , { opened }])}>
    <div className="slider-background" onClick={onClose} />
    <div className="slider">
      <div className="slider__header">
       
        {/* {onClose && (
          <Button className="slider__header__history" onClick={onClose} isInline noStyled>
            <Icon type="history" noStyled />
          </Button>
        )} */}
        <div className="slider__header__title">{title}</div>
        <div className="slider__header__subtitle">{subtitle}</div>
        {onSubmit && (
          <Button className="slider__header__submit" onClick={onSubmit} isInline noStyled>
            <Icon type="checkCircle" noStyled />
          </Button>
        )}
      </div>
      <div className="slider__body">
        {children}
        {onSubmit && !submitTitle && (
        <div className="slider-header-submitbody-submit">
          <Button className="slider-header-submit" onClick={onSubmit} isInline noStyled>
            <Icon type="checkCircle" noStyled />&nbsp;{__("ПРИМЕНИТЬ")}</Button>
        </div>
        )}
        {onRemove && (
        <div className="slider-header-submitbody-submit">
          <Button className="slider-header-remove" onClick={onRemove} isInline noStyled>
            <Icon type="trash" noStyled />&nbsp;DELETE</Button>
        </div>
        )}
         {sms && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit"
                  onClick={() => window.open(`sms:${hasPhone}` + `&body=
                  ${sms}`, '_self')}
                  isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
            {linkWhatsapp && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit"
                  onClick={() => window.open(linkWhatsapp, "_blank")}
                  isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
            {link && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit"
                  onClick={() => window.open(link, "_blank")}
                  isInline noStyled>
                  &nbsp;{submitTitle}
                </Button>
              </div>
            )}
            {onShare && submitTitle && (
              <div className="slider-header-submitbody-submit">
                <Button className="slider-header-submit"
                  onClick={onShare}
                  isInline noStyled>{submitTitle}
                </Button>
              </div>
            )}
            {onRemoveDown && (
        <div className="slider-header-submitbody-submit">
          <Button className="slider-header-remove" onClick={onRemoveDown} isInline noStyled>
            <Icon type="trash" noStyled />&nbsp;DELETE</Button>
        </div>
        )}

      </div>
    </div>
  </div>
);

Slider.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  onShare: PropTypes.func,
  onRemove: PropTypes.func,
  title: PropTypes.string,
  sms: PropTypes.string,
  link: PropTypes.string,
  children: PropTypes.node
};

Slider.defaultProps = {
  opened: false,
  onClose: () => {},
  onSubmit: undefined,
  onRemove: undefined,
  onRemove: undefined,
  title: '',
  sms: '',
  link: '',
  hasPhone: '',
  children: null
};

export default Slider;
