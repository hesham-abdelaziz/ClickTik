import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Subscription, take } from 'rxjs';
import { load } from 'src/app/animation';
import { ProductService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    load
  ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any = [];
  message: string = '';
  isLoading: boolean;
  errorMsg: string = '';
  starIcon = faStar;

  productSub: Subscription;

  current: number = 1;
  totalProducts: number = 0;
  productsToDisplay: any[] = [];
  productsPerPage = 3;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {


    this.productService.isLoading
      .subscribe(isLoading => this.isLoading = isLoading);

        /*
      These two subjects is used to assign  messages to message , errorMsg properties
      for better user experience and error handling
    */
    this.productService.message
      .subscribe(message => this.message = message)

    this.productService.errorMsg
      .subscribe(message => this.errorMsg = message)



    this.productSub = this.productService.products
      .subscribe((data: any) => {
        this.products = data;
        this.current = 1;
        this.totalProducts = Math.ceil(this.products.length / this.productsPerPage)
        this.productsToDisplay = this.paginate(this.current, this.productsPerPage)
      });




  }


  /**
  * @ngOnDestroy life cycle hook starts just before the component get destroyed ,
  * and execute the logic on it.
  * 
  * In the code below we have to unsubscribe to subscribtion to prevent memory leak
  * that can affect the performance of the app
  */
  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  addToCart() {
    this.productService.addToCart();
  }




  /**
* @onGotTo
* @onNext
* @onPrevious
* 
These methods will be called when the user clicks on the component elements
*/

  onGoTo(page: number): void {
    this.current = page;
    this.productsToDisplay = this.paginate(this.current, this.productsPerPage);
  }
  onNext(page: number): void {
    this.current = page + 1;
    this.productsToDisplay = this.paginate(this.current, this.productsPerPage);

  }

  onPrevious(page: number): void {
    this.current = page - 1;
    this.productsToDisplay = this.paginate(this.current, this.productsPerPage);

  }


  paginate(current: number, perPage: number): string[] {
    return [...this.products.slice((current - 1) * perPage).slice(0, perPage)]
  }
}
