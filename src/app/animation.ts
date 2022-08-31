import { trigger, transition, style, animate } from "@angular/animations";



export const open =  
   trigger('open', [
    transition(':enter' , [
      style({ top : '60px' , opacity : 0 , visibility : 'hidden'}),
      animate('300ms ease' , style({top : '80px' , opacity : 1 , visibility : 'visible'}))
    ]),
    transition(':leave' , [
      style({ top : '80px' , opacity : 1 , visibility : 'visible'}),
      animate('300ms ease' , style({top : '60px' , opacity : 0 , visibility : 'hidden'}))
    ]),
  ])

export const load =  
trigger('load' , [
    transition(':enter' , [
      style({transform : 'scale(0)' , opacity : 0}),
      animate('800ms ease' , style({transform : 'scale(1)' , opacity : 1}))
    ]),
    transition(':leave' , [
      style({transform : 'scale(1)' , opacity : 1}),
      animate('400ms ease' , style({transform : 'scale(0)' , opacity : 0}))
    ]),
  ])