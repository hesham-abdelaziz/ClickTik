import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category?: string; 
  product : string;
  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.categorySelected
    .subscribe(category => {
      this.category = category;
    });

    this.productService.searchQuery
    .subscribe(query => {
      this.product = query;
    })
  }

}
