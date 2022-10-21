import { Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BackEndRestClient {
  constructor(private httpClient: HttpClient) {
  }

  getUser(token: string): Observable<any>  {
    return this.httpClient.get('api/v1/user/' + token);
  }

  registerUser(first: string, last: string, email: string): Observable<any>  {
    var body = {
        "firstName": first,
        "lastName": last,
        "email": email
    }
    return this.httpClient.post('api/v1/user', body);
  }
}

