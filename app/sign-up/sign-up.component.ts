import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'userName': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null, [Validators.required, Validators.minLength(6)]],

    });
  }
  signup(formData: NgForm) {
    return this.auth.signup(formData).subscribe(
      (user) => {
        console.log(`added user ${JSON.stringify(user)}`);
        this.router.navigate(['login']);
      });
  }
}
