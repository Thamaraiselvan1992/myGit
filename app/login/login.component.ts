import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl:String;
  

  constructor(private fb: FormBuilder,
     private auth: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
   ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': ['', [Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    });
    this.returnUrl= this.route.snapshot.queryParams['returnUrl'] ||'/';
  }
  login(formData: NgForm) {
    return this.auth.login(formData).subscribe(
      (user) => { 
        console.log(user) ;
        this.router.navigate([this.returnUrl]);
      });
  }
}
