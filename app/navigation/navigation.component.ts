import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { AuthenticationService } from '../authentication.service';
import * as $ from 'jquery';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  menu: any;
  isloggedIn: boolean;
  database='menu';

  constructor(private auth: AuthenticationService,private config:ConfigService,private location:Location) { }

  ngOnInit() {
    this.getMenu(this.database);
    (function ($) {
      (<any>$)('.navbar-nav li a').on('click', function (event) {
        (<any>$)('.navbar-nav li').removeClass('activetab');
        (<any>$)(this).closest('li').addClass('activetab');
        var $anchor = (<any>$)(this);
        var nav = (<any>$)($anchor.attr('routerLink'));
        if (nav.length) {
          (<any>$)('html, body').stop().animate({
            scrollTop: (<any>$)($anchor.attr('routerLink')).offset().top
          }, 1500, 'easeInOutExpo');

          event.preventDefault();
        }
      });
      (<any>$)('.navbar-collapse a').on('click', function () {
        (<any>$)('.navbar-collapse.collapse').removeClass('in');
      });

      // Add smooth scrolling to all links in navbar
      (<any>$)('a.mouse-hover, a.get-quote').on('click', function (event) {
        var hash = this.hash;
        if (hash) {
          event.preventDefault();
          (<any>$)('html, body').animate({
            scrollTop: (<any>$)(hash).offset().top
          }, 1500, 'easeInOutExpo');
        }
      });
    });

  }
getMenu(database){
  this.config.getSettings(database).subscribe(settings=>{
    this.menu=settings;
    console.log(settings);
  });
}
  logout() {

    this.auth.logout();
  }
}
