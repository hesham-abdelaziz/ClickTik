import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn : 'root'})


export class ProductService {

    
    /**
     * @Subject is used to store date and share it between components
     * Its like observables we push the values to it through next() method ,
        then we subscrbie to it to get the latest values.
     */
    categories = new Subject<Array<string>>();
    products = new Subject<Array<string>>();
    productsInCartSub = new Subject<number>()
    categorySelected = new Subject<string>();
    searchQuery = new Subject<string>();
    message = new Subject<string>();
    isLoading = new Subject<boolean>();
    errorMsg = new Subject<string>();




    productsInCart : number = 0;

    constructor(private http : HttpClient){}



 
    getCategories(){
      this.http.get('https://dummyjson.com/products/categories')
    .subscribe({
        next : (res : any) => {
            this.categories.next(res);
        },
        error : (err : HttpErrorResponse) => {
            this.isLoading.next(false);
            this.errorMsg.next('Error Occured!');
        }
    })
      

    }


    /**
     * 
     * @param category is recieved through categories component when the user 
     * choose a category , and then we bind it to the request using template literals
     */

    getProductsInCategory(category : string){
        this.isLoading.next(true);

     this.http.get<{products : Array<any>}>(`https://dummyjson.com/products/category/${category}`)
     .subscribe({
        next : (res) => {
            this.isLoading.next(false);
            this.categorySelected.next(category);
            this.products.next(res.products);
            this.searchQuery.next('');

        },
        error : (err : HttpErrorResponse) => {
            this.isLoading.next(false);
            this.errorMsg.error(err.error.message);
        }
     })
    }



    /**
     * 
     * @param query is recieved through search input in the header component when 
     * the user enter a value and press enter key of press the search icon,
     * and then we bind it to the request using template literals
     */

    searchProduct(query : string){
        this.isLoading.next(true);

        this.http.get<{products : Array<any>}>(`https://dummyjson.com/products/search?q=${query}`)
        .subscribe({
            next : (res) => {
                this.isLoading.next(false);
                if(res.products.length > 0){
                    this.products.next(res.products);
                    this.searchQuery.next(query);
                    this.categorySelected.next(query);
                    this.message.next('')

                }
                else {
                    this.products.next([]);
                    this.message.next('No Matched Results!')
                }
            },
            error : (err : HttpErrorResponse) => {
                this.isLoading.next(false);
                this.errorMsg.error(err.error.message);
            }
        })
    }


    /**
     * This function is used to simulate the proccess of adding products to cart ,
     * by doing an increment to the property productsInCart and then push it to
     * the subject and notify the intersted components that a product is added
     * to the cart.
     */

    addToCart(){
       this.productsInCart ++;
       this.productsInCartSub.next(this.productsInCart);
       sessionStorage.setItem('cartItems' , JSON.stringify(this.productsInCart))
    }


    /**
     * This function is used to return the number of products in the cart,
     * because as user refresh the page the subject will lose it's value.
     * So we stored the value in the sessionStorage and then we get it back
     * when user refresh the page.
     */

    getCartProducts(){
       let items =  sessionStorage.getItem('cartItems');
       this.productsInCart  = JSON.parse(items);
       this.productsInCartSub.next(this.productsInCart);
    }
}