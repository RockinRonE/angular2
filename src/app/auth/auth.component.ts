import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../shared/services'; 



@Component({
  selector: 'auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType: String = '';
  title: String = '';
  isSubmitting: boolean = false; 
  authForm: FormGroup; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
    ) { 
      this.authForm = this.fb.group({
        'email': ['', Validators.required],
        'password': ['', Validators.required]
      });
    }

  ngOnInit() {
    this.route.url.subscribe( data => {
      // Get the last bit of the URL 
      this.authType = data[data.length -1].path;
      // Set page title
      this.title = (this.authType === 'login') ? 'Sign In' : 'Sign Up'; 
      // add username if registering
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl('', Validators.required));
      }
    });
  }

  onSubmit() {
    let credentials = this.authForm.value; 
    // this.isSubmitting = true; 
    this.userService.attemptAuth(this.authType, credentials)
      .subscribe(
        data => this.router.navigateByUrl('/'),
        err => {
          console.log(err);
          // this.isSubmitting = false; 
        }
      )

  }

}
