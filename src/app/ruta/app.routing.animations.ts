import {trigger, state, animate, style, transition} from '@angular/animations';

export function slideToRight() {
  return trigger('slideToRight', [
        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({ opacity: 0 }),
            // animation and styles at end of transition
            animate('0.5s ease-in-out', style({ opacity: 1 }))
        ]),
    ]);
}
