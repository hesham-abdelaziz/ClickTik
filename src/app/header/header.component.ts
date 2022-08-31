import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { open } from '../animation';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../home/products.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations : [
    open
  ]
})
export class HeaderComponent implements OnInit , OnDestroy {
  searchIcon = faMagnifyingGlass
  cartIcon = faCartShopping;

  isMenuToggled : boolean;
  isAuthenticated : boolean;
  subscribe : Subscription;

  inCart : number;
  constructor(public authService : AuthService , private productService : ProductService) {}
        
    
  ngOnInit() {
    this.isAuthenticated = this.authService.getAuthStatus();
    this.subscribe =  this.authService.getStatus().
    subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      if(this.isAuthenticated == false){
        this.toggleMenu();
      }
    })

    this.productService.productsInCartSub
    .subscribe(number => {
      this.inCart = number
    })
  }


  /**
   * @ngOnDestroy life cycle hook starts just before the component get destroyed ,
   * and execute the logic on it.
   * 
   * In the code below we have to unsubscribe to subscribtion to prevent memory leak
   * that can affect the performance of the app
   */

  ngOnDestroy(): void {
      this.subscribe.unsubscribe();
  }

  toggleMenu(){
    this.isMenuToggled = !this.isMenuToggled
  }



  onKeyDown( query){
      this.searchProduct(query);
  }
  

  searchProduct(query){
    this.productService.searchProduct(query);
  }
}
