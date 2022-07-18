import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  readonly KEY = '319411c5987d46b493f160239221802';
  readonly WeatherAPIs = {
    place: 'http://api.weatherapi.com/v1/search.json',
    climate: 'http://api.weatherapi.com/v1/current.json'
  }
  constructor(private http: HttpClient) { }

  getLocations(location: string): Observable<any> {
    const url = `${this.WeatherAPIs.place}?key=${this.KEY}&q=${location}`;
    return this.http.get<any[]>(url);
  }

  getClimate(location: string) {
    const url = `${this.WeatherAPIs.climate}?key=${this.KEY}&q=${location}&aqi=yes`;
    return this.http.get<any[]>(url);
  }
}
