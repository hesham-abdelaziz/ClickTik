import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from './auth.service';
@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;

  hide: boolean = true;

  showIcon = faEye;
  hideIcon = faEyeSlash;


  errorMsg : string = '';
  /**
   * 
   * @param authService used to create a new instance of the service 
   * to access all methods and subjects inside the service
   */
  constructor(private authService: AuthService) { }

  ngOnInit(): void {


    /*
      This subject is used to assign error message to errorMsg property
      for better user experience and error handling
    */
    this.authService.errorMsg
    .subscribe(msg => {
      this.errorMsg = msg;
    })

    /**
           * Create formControl using Reactive Approach
           * Note => We have to import ReactiveFormsModule first in appModule
           */
    /**
     * Validators class is used to add validation to the control 
     */
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })


  }




  // To toggle between true and false

  toggleHide() {
    this.hide = !this.hide
  }


  login(data){
    if(this.loginForm.invalid){
      /* For better user experience we have to notify the user that
        the form is invalid and he cant sign in
      */
      this.loginForm.markAllAsTouched();
      return;
    }
    this.authService.login(data);
  }


}
