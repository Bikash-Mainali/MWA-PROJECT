import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl: string = environment.REST_API_URL;
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  constructor(private http: HttpClient) { }

  addOne(user: any): Observable<any> {
    const url: string = this.baseUrl + "/users";
    return this.http.post<any>(url, user, { headers: this.headers })
  }

  generateTokenAndLogin(user: any): Observable<any> {
    const url: string = this.baseUrl + "/users/login";
    return this.http.post<any>(url, user)
  }

}
