
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthenticationService,
    private router: Router) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      'name': [null, [Validators.required]],
      'email': [null, [Validators.required, Validators.email]],
      'subject': [null, [Validators.required]],
      'message': [null, [Validators.required]],

    });
  }
  send(formData: NgForm) {
    return this.auth.signup(formData).subscribe(
      (user) => {
        console.log(`added user ${JSON.stringify(user)}`);
        this.router.navigate(['contact']);
      });
  }
}
