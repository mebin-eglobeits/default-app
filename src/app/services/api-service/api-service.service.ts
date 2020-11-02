import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from '../data-service/data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = environment.baseUrl
  constructor(
    private httpClient: HttpClient,
    private dataService: DataService
  ) { }
  public processPostApi(url, params = {}) {
    return this.httpClient.post(this.baseUrl + url, params)
  }
  public processGetApi(url, params = {}) {
    return this.httpClient.get(this.baseUrl + url, params)
  }
  public processAuthPostApi(url, params = {}, otpToken?) {
    let headers = new HttpHeaders();
    const token = otpToken ? otpToken : this.dataService.authToken;
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.httpClient.post(this.baseUrl + url, params, { headers })
  }
  public processAuthGetApi(url) {
    let headers = new HttpHeaders();
    const token = this.dataService.authToken;
    headers = headers.set('Authorization', 'Bearer ' + token);
    return this.httpClient.get(this.baseUrl + url, { headers })
  }
}
