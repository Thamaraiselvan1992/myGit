import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { FormControl, FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  news: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.news = this.fb.group({
'UserName':[null,[Validators.required]],
'Userpass':[null,[Validators.required,Validators.minLength(8)]]
    });
  }
login(formData:NgForm){
  console.log(formData);
}
}