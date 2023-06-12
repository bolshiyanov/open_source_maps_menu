class Background {
  constructor(props = {}) {
    this.name = props.name || 'Undefined';

    const {
      fontColor,
      color,
      image,
      repeat
    } = props;
    this.fontColor = fontColor;
    this.color = color;
    this.image = image;
    this.repeat = repeat;
  }

  getStyles() {
    const style = {};
    if (this.fontColor)
      style.color = this.fontColor;
    if (this.color)
      style.background = this.color;
    if (this.image) {
      const imageRepeat = this.repeat || 'no-repeat';
      style.backgroundImage = `URL(${this.image})`;
      if (imageRepeat === 'no-repeat') {
        style.backgroundSize = 'cover';
        style.backgroundRepeat = 'no-repeat';
        style.backgroundPosition = 'center center';
      }
      else
        style.backgroundRepeat = 'repeat';
    }
    return style;
  }

  getFontColorStyles() {
    return { color: this.fontColor };
  }

  getPreviewStyles() {
    const style = {};
    if (this.image) {
      style.backgroundImage = `URL(${this.image})`;
      style.backgroundPosition = 'center center';
      style.backgroundSize = 'cover';
      style.backgroundRepeat = 'no-repeat';
    }
    else
      style.background = this.color || '#fff';
    return style;
  }
}

export default Background;
