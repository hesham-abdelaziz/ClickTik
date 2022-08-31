import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements  OnChanges {

  nextIcon = faChevronRight;
  prevIcon = faChevronLeft;

  /**
   * @Input decorator is used notify angular that this property will get value 
      from another component through property binding
   */
  @Input() totalProducts = 0;
  @Input() productsPerPage = 0;
  @Input() currentPage : number = 0;

  /**
   * @Output decorator is used to bind event through components
   */
  @Output() goTo: EventEmitter<number> = new EventEmitter<number>()
  @Output() next: EventEmitter<number> = new EventEmitter<number>()
  @Output() previous: EventEmitter<number> = new EventEmitter<number>()


  /**
   * @pages property to know which page will be displayed
   */
  pages : any[] = [];


  constructor() { }




  /**
   * @ngOnChanges gets executed when changes occure in the component
   */
  ngOnChanges() {
      this.pages = this.getPages(this.currentPage, this.totalProducts);
  }



  /**
   * @getPages : A function that returns the number of pages according to the 
     length of the total products in the category
   */

  private getPages(current: number, total: number) {

    /**
     * @keys method gives an iterator containing the key for each index in the array
     * So we have to use spread operator (...) to the get the value of these keys
     * We map over this array and add ( 1 ) since we need to start from 1 not 0
     */
    if (total <= 7) {
      /*
        This condition return pages 1 to 7 if the total pages is 7 or less
      */
      return [...Array(total).keys()].map(x => ++x)
    }

    if (current > 5) {
        /*
        This condition return pages 1 to total if the total pages is 5 or more
      */
      if (current >= total - 4) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
      } else {
        return [1, '...', current - 1, current, current + 1, '...', total]
      }
    }

    return [1, 2, 3, 4, 5, 6, '...', total]
  }  


    /**
   * @onGotTo
   * @onNext
   * @onPrevious
   * These methods will be called when the user clicks on the component elements
   */

   onGoTo(page: number): void {
    this.goTo.emit(page)
  }
   onNext(): void {
    this.next.emit(this.currentPage)
  }
   onPrevious(): void {
    this.previous.next(this.currentPage)
  }

}
