const createImage = (url) => new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener('load', () => resolve(image));
  image.addEventListener('error', (error) => reject(error));
  image.setAttribute('crossOrigin', 'anonymous');
  image.src = url;
});

const createVideo = (url) => new Promise((resolve, reject) => {
  const video = document.createElement("video");
  video.addEventListener('loadeddata', () => resolve(video));
  video.addEventListener('error', (error) => reject(error));
  video.setAttribute('preload', 'auto');
  video.setAttribute('muted', 'muted');
  video.setAttribute('autoplay', 'true');
  video.setAttribute('crossOrigin', 'anonymous');
  video.src = url;
});

const getRadianAngle = (degreeValue) => (degreeValue * Math.PI) / 180;

const fileReader = (file) => (
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.addEventListener('error', (error) => reject(error), false);

    reader.readAsDataURL(file);
  })
);

const MAX_RATIO = 2000;
export async function resizeImage(imageSrc) {
  const image = await createImage(imageSrc);

  const maxSize = Math.max(image.height, image.width);
  if (maxSize < MAX_RATIO)
    return imageSrc;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const ratio = MAX_RATIO / maxSize;

  const newWidth = image.width * ratio;
  const newHeight = image.height * ratio;
  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(image, 0, 0, newWidth, newHeight);
  return canvas.toDataURL('image/jpeg', 0.9);
}

export async function getRotatedImage(imageSrc, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const orientationChanged = rotation === 90
    || rotation === -90
    || rotation === 270
    || rotation === -270;
  if (orientationChanged) {
    canvas.width = image.height;
    canvas.height = image.width;
  }
  else {
    canvas.width = image.width;
    canvas.height = image.height;
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return canvas.toDataURL('image/jpeg', 0.9);
}

export async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const safeArea = Math.max(image.width, image.height) * 2;

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  );
  return canvas.toDataURL('image/jpeg', 0.9);
}

export async function getThumbnail(videoSrc, format, quality) {
  const video = await createVideo(videoSrc);

  format = format || 'jpeg';
  quality = quality || 0.92;

  if (!video || (format !== 'png' && format !== 'jpeg')) {
    return null;
  }

  var canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  return canvas.toDataURL('image/' + format, quality);
}

export default fileReader;
