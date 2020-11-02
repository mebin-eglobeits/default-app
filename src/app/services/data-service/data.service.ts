import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _loginStatus: boolean = false;
  private _loggedUserData: any = {};
  private _authToken: string = '';
  constructor(
  ) {
  }
  public get loginStatus(): boolean {
    return this._loginStatus;
  }
  public set loginStatus(value: boolean) {
    this._loginStatus = value;
  }
  public get loggedUserData(): any {
    return this._loggedUserData;
  }
  public set loggedUserData(value: any) {
    this._loggedUserData = value;
  }
  public get authToken(): string {
    return this._authToken;
  }
  public set authToken(value: string) {
    this._authToken = value;
  }
}
