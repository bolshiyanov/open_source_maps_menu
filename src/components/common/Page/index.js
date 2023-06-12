import React from 'react';
import PropTypes from 'prop-types';

class PageSlider extends React.Component {

  constructor() {
    super();
    this.renderCloseDiv = this.renderCloseDiv.bind(this);
  }

  renderCloseDiv() {
    const defaultCloseStyle = { position: 'absolute', right: '10px', top: '10px' };

    const closeStyle = Object.assign({}, defaultCloseStyle, this.props.closeStyle);

    if (typeof this.props.close === 'function') {
      return (<a href="#" onClick={this.props.close} style={closeStyle}>
        {this.props.closeText || 'Close'}
      </a>);
    } else {
      return (
        <div style={closeStyle}>
          {this.props.close}
        </div>
      );
    }
  }


  calculateSlidingStyle() {
    let oneHundred = 110;
    switch (this.props.slideFrom) {
      case 'left':
        oneHundred *= -1;
      case 'right':
        return { hidden: { marginLeft: oneHundred+'%', visibility:'hidden' }, shown: { marginLeft: '0%', visibility:'' } };
      case 'top':
        oneHundred *= -1;
      case 'bottom':
      default:
        return { hidden: { marginTop: oneHundred+'%', visibility:'hidden' }, shown: { marginTop: '0%', visibility:'' } };
    }
  }

  calculateOuterStyle() {
    const overlayStyle = {
      minWidth: '100%',
      minHeight: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      position: 'fixed',
      background: '#000',
      boxShadow: '0px 0px 0px 0px rgba(0,0,0,0.6)',
      WebkitTransition: 'all .5s linear',
      MozTransition: 'all .5s linear',
      OTransition: 'all .5s linear',
      transition: 'all .5s linear',
      top: 0,
      willChange: 'transform'
    };

    const defaultStyle = {
      backgroundColor: '#000',
      zIndex: '2'
    };

    const { backgroundColor , zIndex } = Object.assign({}, defaultStyle, this.props.customStyle);
    const behaviour = this.calculateSlidingStyle();
    const shownStyle = Object.assign({}, overlayStyle, behaviour.shown, { backgroundColor, zIndex });
    const hiddenStyle = Object.assign({}, overlayStyle, behaviour.hidden, { backgroundColor, zIndex });

    return this.props.show ? shownStyle  : hiddenStyle;
  }

  calculateInnerStyle() {

    const centered = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    };

    return Object.assign({}, centered, this.props.innerStyle);
  }

  render() {
    const { children } = this.props;
    // extract only styles that are needed
    const outerStyle = this.calculateOuterStyle();
    const innerStyle = this.calculateInnerStyle();
    const closeDiv = this.renderCloseDiv();

    return (
      <div style={outerStyle}>
        {closeDiv}
        <div style={innerStyle}>
          {children}
        </div>
      </div>
    );
  }
}

PageSlider.propTypes = {
  close: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  closeStyle: PropTypes.shape({}),
  closeText: PropTypes.string,
  customStyle: PropTypes.shape({}),
  innerStyle: PropTypes.shape({}),
  show: PropTypes.bool,
  slideFrom: PropTypes.oneOf(['right', 'bottom', 'left', 'top']),
  children: PropTypes.node
};

PageSlider.defaultProps = {
  close: undefined,
  closeStyle: {},
  closeText: '',
  customStyle: {},
  innerStyle: {},
  show: false,
  slideFrom: 'bottom',
  children: null
};

export default PageSlider;
