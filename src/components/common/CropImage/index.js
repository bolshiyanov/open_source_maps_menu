import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOrientation } from 'get-orientation/browser';
import Cropper from 'react-easy-crop';

import fileReader, { getRotatedImage, getCroppedImg, resizeImage } from 'utils/fileReader';
import {__} from 'utils/translation';
import Loading from 'components/common/Loading';
import Button from 'components/common/Button';
import Icon from 'components/common/Icon';

import './index.scss';

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90
};

const aspect = 1;

const CropImage = ({ file, onSave }) => {
  const [image, setImage] = useState({ data: null, loading: true });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [currentRotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const loadImage = async () => {
    if (image.loading) {
      let imageData = await fileReader(file);
      imageData = await resizeImage(imageData);
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation)
        imageData = await getRotatedImage(imageData, rotation);

      setImage({
        data: imageData,
        loading: false
      });
    }
  };

  const onZoomChange = (zoomData) => {
    setZoom(zoomData);
  };

  const onRotate = () => {
    setRotation(currentRotation + 90);
  };

  const onCropChange = (cropData) => {
    setCrop(cropData);
  };

  const onCrop = async () => {
    if (image.data && !image.loading) {
      const imageData = await getCroppedImg(image.data, croppedAreaPixels, currentRotation);
      onSave(imageData);
    }
  };

  const onCropComplete = (croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  useEffect(() => {
    loadImage();
  }, [file]);

  if (!file)
    return null;

  if (image.loading)
    return <Loading />;

  return (
    <div className="crop-image">
      <div className="crop-image__container">
        <Cropper className="css-ebdd77"
          image={image.data}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          rotation={currentRotation}
          onZoomChange={onZoomChange}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
        />
      </div>

      <div className="crop-image__footer">
        <Button
          className="crop-image__button__redo"
          noStyled
          isInline
          onClick={onRotate}
        >
          <Icon type="redoAlt" className="icon-16" /></Button>
        <Button className="crop-image__button__checkcircle"
          isInline
          noStyled
          onClick={onCrop}
        >
          <Icon type="checkCircle" />&nbsp;{__("СОХРАНИТЬ")}</Button>

      </div>
    </div>
  );
};

CropImage.propTypes = {
  file: PropTypes.any, // eslint-disable-line
  onSave: PropTypes.func.isRequired
};

CropImage.defaultProps = {
  file: undefined
};

export default CropImage;
