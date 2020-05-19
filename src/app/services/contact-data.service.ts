import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { Users } from '../interfaces/Users';

@Injectable({
  providedIn: 'root'
})
export class ContactDataService {
  public page: number = 1;
  private _url: string = 'https://reqres.in/api/users?page='+ this.page;

  constructor(private http: HttpClient) { }

  getContactData(): Observable<Users[]> {
    return this.http.get<Users[]>(this._url)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    return throwError(error.message || 'Something Went Wrong');
  }

}
