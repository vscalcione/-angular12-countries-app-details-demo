import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private postsUrl = "http://localhost:8080/countries";

  constructor(private http: HttpClient) { }

  deg2rad(deg: any) {
    return deg * (Math.PI/180);
  }

  getDistanceFromLatLonInKm({ lat1, lat2, lon1, lon2} : any) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.pow(2, Math.sin(dLat / 2)) * 
      Math.cos(this.deg2rad(lat1)) * 
      Math.cos(this.deg2rad(lat2)) *
      Math.pow(2, Math.sin(dLon / 2));
    
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  getCountry(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'Content-Length,X-Foo,X-Bar',
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(this.postsUrl, httpOptions);
  }
}
