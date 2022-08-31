import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { ProductService } from './home/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authService : AuthService , private productService : ProductService) {
  }

  ngOnInit(): void {
      this.authService.autoAuthUser();
      setTimeout(() => {
        this.productService.getCartProducts();
        
      });
  }
}
