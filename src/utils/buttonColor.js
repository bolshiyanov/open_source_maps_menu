class ButtonColor {
  constructor(props = {}) {
    this.name = props.name || 'Undefined';

    this.fontColor = props.fontColor;
    this.borderColor = props.borderColor;
    this.backgroundColor = props.backgroundColor;
  }

  getStyles() {
    const style = {};
    if (this.fontColor)
      style.color = this.fontColor;
    if (this.borderColor)
      style.borderColor = this.borderColor;
    if (this.backgroundColor)
      style.background = this.backgroundColor;
    return style;
  }

  getPreviewStyles() {
    return {
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor || 'transparent'
    };
  }
}

export default ButtonColor;
