import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loadSession = false;
  constructor(private http: HttpService) { }

  getEmp(){
    this.http.get("employees").subscribe(
      response => {
          console.log(response);
          return response;
      }
    )
  }
}
