import React from 'react';
import { Dimensions, PixelRatio, useWindowDimensions } from 'react-native';
/** view port width
 * should be between 0 - 100
 * base on the width of window not screen
 */
export function vw(size: number) {
  /** put it inside function just to make sure you are getting the updated version every time you call vw */
  const DEVICE_WIDTH = Dimensions.get('window').width;

  return (DEVICE_WIDTH / 100) * size;
}

/** view port height
 * should be between 0 - 100
 * base on the height of window not screen
 */
export function vh(size: number) {
  /** put it inside function just to make sure you are getting the updated version every time you call vw */
  const DEVICE_HEIGHT = Dimensions.get('window').height;

  return (DEVICE_HEIGHT / 100) * size;
}

/** value is a flexible value like vw(10), and it can't go beyond max and less than min
 * for more information https://developer.mozilla.org/en-US/docs/Web/CSS/clamp
 */
export function clamp(min: number, value: number, max: number) {
  return Math.min(Math.max(min, value), max);
}
/** base is 16 by default, so 1rem is 16 */
export function rem(value: number, base: number = 16) {
  return PixelRatio.getFontScale() * base * value;
}
/** view port minimum, 1 vmin is the 1vw if vw < vh or 1vh if vh < wh */
export function vmin(size: number) {
  return Math.min(vw(size), vh(size));
}

/** view port maximum, 1 vmax is the 1vw if vw > vh or 1vh if vh > wh */
export function vmax(size: number) {
  return Math.max(vw(size), vh(size));
}

/** return `part%` of `total` */
export function percentage(part: number, total: number) {
  return (total / 100) * part;
}

/** it's a simply a wrapper around useWindowDimension, you can simply use useWindowDimension instead : | . we only need to to re-render the component so that `vw` or `vh` functions re-run and calculate new values
 * when the device dimension change, for example when user rotate the device.
 * I only made this hook so that you understand the mechanic of how units work when dimension change.
 */
export function useRerenderOnDimensionChange() {
  useWindowDimensions();
}

/** mobile first approach min-width
 * [tablet, desktop, largeDesktop]
 * just to mention you don't have to provide mobile breakpoint
 **/
export function useBreakpoints(breakpoints: number[]) {
  const { width: DEVICE_WIDTH } = useWindowDimensions();

  if (!breakpoints || breakpoints.length === 0) {
    throw new Error('please provide breakpoints array');
  }

  let matchIndex = breakpoints.findIndex((value) => value <= DEVICE_WIDTH);

  const pick = React.useCallback(
    (values: number[]) => {
      return values[matchIndex + 1];
    },
    [matchIndex]
  );

  return pick;
}
