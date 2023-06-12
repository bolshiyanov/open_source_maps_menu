import Background from './background';
import ButtonColor from './buttonColor';

const defaultBackground = {
  fontColor: '#000',
  color: '#fff'
};

const defaultButton = {
  fontColor: '#000',
  color: '#fff',
  borderColor: '#000'
};

const { error } = console;

class Theme {
  constructor(props = {}) {
    if (!props.name)
      error('Invalid theme name.');

    this.name = props.name || 'Undefined';
    this.background = new Background(props.background || defaultBackground);
    this.button = new ButtonColor(props.button || defaultButton);
  }

  getBackgroundStyles() {
    return this.background.getStyles();
  }

  getButtonStyles() {
    return this.button.getStyles();
  }

  getThemePreviewStyles() {
    return this.background.getPreviewStyles();
  }

  getFontColorStyles() {
    return this.background.getFontColorStyles();
  }
}

export default Theme;
