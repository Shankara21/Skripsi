import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
} from '@angular/animations';
import {
  bounce,
  swing,
  slideInLeft,
  slideInDown,
  zoomIn,
  zoomOut,
  fadeInDown,
  fadeInUp,
} from 'ng-animate';
export const zoomInOutVar = trigger('ZoomInOutAnimation', [
  transition(':enter', useAnimation(zoomIn, { params: { timing: .5 } })),
  transition(':leave', useAnimation(zoomOut, { params: { timing: 0.25 } })),
]);
