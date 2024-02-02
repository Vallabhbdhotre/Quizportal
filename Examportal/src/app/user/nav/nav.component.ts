import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  localdata = localStorage.getItem('userData');
  userData: any;
  constructor(public loginservice: LoginService ,private router:Router) {
    if (this.localdata != null) {
      this.userData = JSON.parse(this.localdata);
    }

  }
  @Output() public sidenavToggled= new EventEmitter();
  sidenavStatus:boolean=true;
  sidenavtoggle(){
    this.sidenavStatus=!this.sidenavStatus
    this.sidenavToggled.emit(this.sidenavStatus);
    console.log(this.sidenavStatus);
    
  }
  logout(){
    this.loginservice.logout();
    this.router.navigate(['auth'])
  }

}
