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

