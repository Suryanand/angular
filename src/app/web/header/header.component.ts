import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService : LoginService) { }

  ngOnInit() {
    console.log("Inside Init");
  }
  clickMe(){
    console.log("Hello", this.loginService.loadSession);
    console.log("Hi", this.loginService.getEmp());
  }
}
