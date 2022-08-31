import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { loginData } from "./auth-interface";


// This decorator used to provide the service all over the app
@Injectable({providedIn : 'root'})


export class AuthService {

    url : string = 'https://dummyjson.com/auth/login'
    private isAuthenticated = false;
    private token;
    private authStatus = new Subject<boolean>();
    errorMsg = new Subject<string>();

    /* 
      We have to inject http client to be able to 
      send requests to backend


      Note => We have to import HttpClientModule in appModule first
    */

      
    constructor(private http : HttpClient , private router : Router){}


    getStatus() {
        return this.authStatus.asObservable();
      }

      getAuthStatus() {
        return this.isAuthenticated;
      }


    login(data){

      /**
       * Interface loginData used to force the user object to be a blueprint for the 
       *    interface properties andn prevent any other values
       */
        const user : loginData = {
            username : data.username,
            password : data.password,
        }

        this.http.post<{id : number , token : string}>(this.url  , user)
        .subscribe({
            next : (res) => {
                this.token = res.token;
                this.isAuthenticated = true;
                this.authStatus.next(true);
                this.saveSessionData(res.id , res.token)
                this.router.navigate(['/'])
            },
            error :(err : HttpErrorResponse) => {
              this.errorMsg.next(err.error.message);
                console.log(err);
            }
        })
    }

   /**
     * As we are using Subjects , when the user refresh the page all the data
     * in the subject will get lost. To solve this problem we have to store the data
     * in localStorage or sessionStorage and get it back whenever we want.
     * 
     * @Function saveSessionData is private to prevent access to it from 
     * outside the service
     */

    private  saveSessionData(id , token){
        sessionStorage.setItem('id' , id);
        sessionStorage.setItem('token' , token);
      }
      
      
      
      
      /**
     * In this function we get the token and user id from the storage , so we can
     * use them.
     */

          private getAuthData() {
              const userId = sessionStorage.getItem('userId');
              const token = sessionStorage.getItem('token');
          
              if (!token) {
                return false;
              }
              return {
                userId: userId,
                token: token,
              };
            }



            // This function authenticate user when he refresh the page
    autoAuthUser() {
        const authInformation: any = this.getAuthData();
        if (!authInformation) {
          return;
        }       
          this.token = authInformation.token;
          this.isAuthenticated = true;
          this.authStatus.next(true);
      }





      /*
        We clear the sessionStorage and emit new values to the authStatus subject
        to notify all the app that the used isn't authenticated anymore and then 
        redirect him through router service to the login page
      */

      logout() {
        sessionStorage.clear();
        this.token = null;
        this.isAuthenticated = false;
        this.authStatus.next(false);
        this.router.navigate(['/login']);
      }
}