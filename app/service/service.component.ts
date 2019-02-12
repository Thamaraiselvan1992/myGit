import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../config.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
service={

};
  constructor(private config:ConfigService) { }

  ngOnInit() {
    this.service=this.getService();
  }
getService(){
  return this.config.getconfig().service;
}
}
