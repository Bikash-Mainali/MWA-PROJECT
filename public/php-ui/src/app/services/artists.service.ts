import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../constants/appconstants';
import { Artists } from '../models/artists';

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {

  baseUrl: string = environment.REST_API_URL;
  headers: HttpHeaders = AppConstants.headers;

  constructor(private http: HttpClient) { }

  addOne(songId: string, artist: any): Observable<any> {
    console.log(artist)
    const url: string = this.baseUrl + "/songs/" + songId + "/artists";
    return this.http.post<any>(url, artist, { headers: this.headers });
  }

  getOne(songId: string, artistId: string): Observable<any> {
    const url: string = this.baseUrl + "/songs/" + songId + "/artists/" + artistId;
    return this.http.get<any>(url, { headers: this.headers });

  }

  updateOne(artist: Artists, songId: string, artistId: string): Observable<Artists> {
    const url: string = this.baseUrl + "/songs/" + songId + "/artists/" + artistId;
    return this.http.patch<Artists>(url, artist, { headers: this.headers })
  }

  deleteOne(songId: string, artistId: string): Observable<Artists> {
    const url: string = this.baseUrl + "/songs/" + songId + "/artists/" + artistId;
    return this.http.delete<any>(url, { headers: this.headers })
  }

}
