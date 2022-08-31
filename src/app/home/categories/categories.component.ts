import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Subscription } from 'rxjs';
import { ProductService } from '../products.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit , OnDestroy{
  
  categories : Array<string> = [];
  productNum : Array<number>;
  errorMsg : string = '';
  productNumber : number;
  isLoading : boolean;
  categorySub : Subscription;

  searchQuery : string;
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.getCategories();
  this.categorySub =  this.productService.categories
    .subscribe(categories => {
      this.isLoading = false;
      this.categories = categories;
      this.productService.getProductsInCategory(this.categories[0]);
      this.productService.searchQuery.next('')

    });


    this.productService.searchQuery
    .subscribe(query => this.searchQuery = query);

      /*
      This subject is used to assign error message to errorMsg property
      for better user experience and error handling
    */
    this.productService.errorMsg
    .subscribe(message => this.errorMsg = message)
  }


   /**
   * @ngOnDestroy life cycle hook starts just before the component get destroyed ,
   * and execute the logic on it.
   * 
   * In the code below we have to unsubscribe to subscribtion to prevent memory leak
   * that can affect the performance of the app
   */
  
  ngOnDestroy(): void {
      this.categorySub.unsubscribe();
  }

  changeEvent(category) {
        this.productService.getProductsInCategory(category);
  }







}
