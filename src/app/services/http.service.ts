import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environment.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  get(path: string): Observable<any> {
      return this.http.get<any>(this.getFullPath(path), this.getOptions())
          .pipe(
              map(response => response),
              catchError(error => this.handleError(error))
          );
  }

  post(path: string, data?: any): Observable<any> {
      return this.http.post(this.getFullPath(path), data, this.getOptions())
          .pipe(
              map(response => response),
              catchError(error => this.handleError(error))
          );
  }

  put(path: string, data?: any): Observable<any> {
      return this.http.put(this.getFullPath(path), data, this.getOptions())
          .pipe(
              map(response => response),
              catchError(error => this.handleError(error))
          );
  }

  delete(path: string, data?: any): Observable<any> {
      return this.http.delete(this.getFullPath(path), this.getOptions(data))
          .pipe(
              map(response => response),
              catchError(error => this.handleError(error))
          );
  }

  getFullPath(path) {
      return environment.APP_URL + path;
  }

  handleError(responseError) {
      console.error('http-error', responseError);
      const error = responseError.error || { 
          error: responseError.name,
          status: responseError.status,
          message: responseError.message
      }
      
      if (error.status == 401) {
          console.log('http resource not authorized, redirection to /auto-login');
          window.location.href = '/login';
      }
      return error;
  }

  getOptions(data?: any) {
      const headers = new HttpHeaders({'Content-Type' : 'application/json', 'Access-Control-Allow-Origin': '*'});
      const options = { headers: headers };

      // if (data) {
      //     options.body = data;
      // }

      return options;
  }

  protected addPagin(url: string, page?: number, size?: number): string {
      let pagin = url;
      if (page || size) {
          pagin += '?';
      }
      if (page) {
          pagin += `page=${page}&`;
      }
      if (size) {
          pagin += `size=${size}&`;
      }
      return pagin;
  }
}
