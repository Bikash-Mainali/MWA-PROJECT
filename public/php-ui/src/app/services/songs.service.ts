import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../constants/appconstants';
import { Songs } from '../models/songs';

@Injectable({
  providedIn: 'root'
})
export class SongsService {

  baseUrl: string = environment.REST_API_URL;
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('xAuthToken')
  });

  constructor(private http: HttpClient) { }

  getAllSongs(searchFilter:any): Observable<any> {
    console.log(localStorage.getItem('xAuthToken'))
    let url!:string
    console.log("getting all song: service")
    if(!searchFilter.value){
    url = this.baseUrl + "/songs";
    }else{
      console.log(searchFilter.searchCriteria.releasedDate)
      url = this.baseUrl + `/songs?title=${searchFilter.searchCriteria.title}&genre=${searchFilter.searchCriteria.genre}&releasedDate=${searchFilter.searchCriteria.releasedDate}`;
    }
    console.log(this.headers)
    return this.http.get<any>(url, { headers: this.headers })
  }


  getOne(songId: string): Observable<any> {
    const url: string = this.baseUrl + "/songs/" + songId;
    return this.http.get<any>(url, { headers: this.headers });
  }

  deleteOne(songId: string): Observable<any> {
    const url: string = this.baseUrl + "/songs/" + songId;
    return this.http.delete<any>(url, { headers: this.headers })
  }

  addOne(song: Songs):Observable<Songs> {
    const url: string = this.baseUrl + "/songs";
    return this.http.post<Songs>(url, song, { headers: this.headers })
  }

  updateOne(song: Songs, songId:string): Observable<Songs> {
    const url: string = this.baseUrl + "/songs/"+ songId;
    return this.http.patch<Songs>(url, song, { headers: this.headers })
  }

}
