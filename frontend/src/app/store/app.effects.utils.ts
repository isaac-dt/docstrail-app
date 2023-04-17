import { CommentThread_GraphScreenshot } from '../generated/types/trail/comment/thread.pb';
import { SvgData } from './app.model';

/** Debounce timer in milliseconds. Used to pace api queries. */
export const EFFECT_DEBOUNCE_TIMER_MS = 200;

/** Constructs a cropped image element from svg & crop info. */
export function getCroppedImageElFromSvg(args: {
  svgData: SvgData;
  imageWidthPx?: number;
  imageHeightPx?: number;
}): CommentThread_GraphScreenshot {
  const svgData = args.svgData;
  const imageWidthPx = args.imageWidthPx ?? 300; // Default image height.
  const imageHeightPx = args.imageHeightPx ?? 150; // Default image height.

  // Create an image html element.
  const imageOuterHtml = `<img src="data:image/svg+xml,${getEncodedSvg(
    svgData.element
  )}">`;
  const parent = document.createElement('div');
  parent.innerHTML = imageOuterHtml;
  const imageEl = parent.firstElementChild! as HTMLElement;

  // Get a scale multiplier that allows any length to maintai ratio with the desired height and width.
  const scaleMultiplierX =
    imageWidthPx / Math.abs(svgData.cropPoint2.x - svgData.cropPoint1.x);
  const scaleMultiplierY =
    imageHeightPx / Math.abs(svgData.cropPoint2.y - svgData.cropPoint1.y);
  const scaleMultiplier =
    scaleMultiplierX > scaleMultiplierY ? scaleMultiplierY : scaleMultiplierX;

  // Normalize the image width and height.
  const svgHeight = +svgData.element.split('height="')[1].split('"')[0];
  const svgWidth = +svgData.element.split('width="')[1].split('"')[0];
  const imgWidth = svgWidth * scaleMultiplier;
  const imgHeight = svgHeight * scaleMultiplier;
  imageEl.style.width = imgWidth + 'px';
  imageEl.style.height = imgHeight + 'px';

  // Move image around its parent for cropping.
  const imgMargLeft =
    -1 * scaleMultiplier * Math.min(svgData.cropPoint1.x, svgData.cropPoint2.x);
  const imgMargTop =
    -1 * scaleMultiplier * Math.min(svgData.cropPoint1.y, svgData.cropPoint2.y);
  imageEl.style.marginLeft = imgMargLeft + 'px';
  imageEl.style.marginTop = imgMargTop + 'px';

  // Create the image container's (i.e., cropper parent) width and height.
  const p1 = {
    x: svgData.cropPoint1.x,
    y: svgData.cropPoint1.y,
  };
  const p2 = {
    x: svgData.cropPoint2.x,
    y: svgData.cropPoint2.y,
  };
  const cropWidth = Math.abs(p2.x - p1.x) * scaleMultiplier;
  const cropHeight = Math.abs(p2.y - p1.y) * scaleMultiplier;
  const croppedImgEl = `<div style="overflow:hidden; width:${cropWidth}px;height:${cropHeight}px">${imageEl.outerHTML}</div>`;

  // Build proto object to represent screenshot.
  const screenshot = CommentThread_GraphScreenshot.fromPartial({
    imageContainerOuterHtml: croppedImgEl,
    imageContainerWidth: Math.floor(cropWidth),
    imageContainerHeight: Math.floor(cropHeight),
    imageOuterHtml: imageEl.outerHTML,
    imageWidth: Math.floor(imgWidth),
    imageHeight: Math.floor(imgHeight),
    imageMarginLeft: Math.floor(imgMargLeft),
    imageMarginTop: Math.floor(imgMargTop),
  });

  return screenshot;
}

/** Encodes svg to use in img tag. */
function getEncodedSvg(svgString: any) {
  const tags = [
    'div',
    'b',
    'u',
    'i',
    'span',
    'font',
    'ol',
    'ul',
    'li',
    'sub',
    'sup',
  ];
  for (const tag of tags) {
    svgString = svgString
      .replace(new RegExp(`<${tag}`, 'g'), `<xhtml:${tag}`)
      .replace(new RegExp(`<\/${tag}>`, 'g'), `</xhtml:${tag}>`);
  }
  return (
    svgString
      .replace(
        '<svg',
        ~svgString.indexOf('xmlns')
          ? '<svg'
          : '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml"'
      )
      .replace(/"/g, "'")
      // .replace(/%/g, '%25')
      .replace(/#/g, '%23')
    // .replace(/{/g, '%7B')
    // .replace(/}/g, '%7D')
    // .replace(/</g, '%3C')
    // .replace(/>/g, '%3E')
    // .replace(/\s+/g, ' ')
  );
  //  .replace(/&/g, '%26')
  //  .replace('|', '%7C')
  //  .replace('[', '%5B')
  //  .replace(']', '%5D')
  //  .replace('^', '%5E')
  //  .replace('`', '%60')
  //  .replace(';', '%3B')
  //  .replace('?', '%3F')
  //  .replace(':', '%3A')
  //  .replace('@', '%40')
  //  .replace('=', '%3D')
}

export function getTitleCase(str?: string) {
  if (!str) return undefined;
  return str
    .split(' ')
    .map((part) => `${part[0].toLocaleUpperCase()}${part.slice(1)}`)
    .join(' ');
}
