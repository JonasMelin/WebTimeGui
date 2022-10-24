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

  getProjects(token: string): Observable<any>  {
    return this.httpClient.get('api/v1/project/' + token);
  }

  getActivities(token: string): Observable<any>  {
    return this.httpClient.get('api/v1/activity/' + token);
  }

  getLastLog(token: string): Observable<any>  {
    return this.httpClient.get('api/v1/logging/lastlog/' + token);
  }

  putStopLogging(token: string): Observable<any>  {
    return this.httpClient.put('api/v1/logging/stop/' + token, null);
  }

  registerUser(first: string, last: string, email: string): Observable<any>  {
    var body = {
        "firstName": first,
        "lastName": last,
        "email": email
    }
    return this.httpClient.post('api/v1/user', body);
  }

  addProject(token: string, projectName: string): Observable<any>  {
    var body = {
        "token": token,
        "projectName": projectName
    }
    return this.httpClient.post('api/v1/project', body);
  }

  addActivity(token: string, activityType: string): Observable<any>  {
    var body = {
        "token": token,
        "activityType": activityType
    }
    return this.httpClient.post('api/v1/activity', body);
  }

  updateLogging(token: string, activityType: string, projectName: string, timeoutMin: number): Observable<any>  {
    var body = {
        "token": token,
        "activityType": activityType,
        "projectName": projectName,
        "timeoutMin": timeoutMin
    }
    return this.httpClient.post('api/v1/logging', body);
  }
}

