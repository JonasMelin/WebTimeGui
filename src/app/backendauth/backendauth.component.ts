import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackEndRestClient } from '../service/BackEndRestClient';
import { GlobalVariable } from '../globals';

@Component({
  selector: 'app-backendauth',
  templateUrl: './backendauth.component.html',
  styleUrls: ['./backendauth.component.css']
})
export class BackendauthComponent implements OnInit {

  private restClient: BackEndRestClient;
  authenticated: boolean = false
  firstName: string = ""
  lastName: string = ""

  constructor(
    private router: ActivatedRoute,
    restClient: BackEndRestClient) { 
      this.restClient = restClient
    }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {

      if ('token' in params) {
        GlobalVariable.auth_token = params['token']
        this.getUserFromBackend(GlobalVariable.auth_token)
      }
    });
  }

  getUserFromBackend(token: string) {
    console.log('Get user from backend')
    this.restClient?.getUser(token).subscribe(retData => {
      this.setAuthentication(true, retData)
    }, error => {
      this.setAuthentication(false, null)
    });
  }

  capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }

  setAuthentication(authenticated: boolean, auth_data: any) {

    if (  authenticated && 
          auth_data != null && 
          "firstName" in auth_data &&
          "lastName" in auth_data && 
          "token" in auth_data) {
      this.firstName = this.capitalizeFirstLetter(auth_data["firstName"])
      this.lastName = this.capitalizeFirstLetter(auth_data["lastName"])
      GlobalVariable.auth_token = auth_data["token"]
      GlobalVariable.authenticated = authenticated
      this.authenticated = authenticated
      console.log("User is authenticated...")
    } else {
      this.firstName = ""
      this.lastName = ""
      GlobalVariable.auth_token = ""
      GlobalVariable.authenticated = authenticated
      this.authenticated = authenticated
      console.log("Authentication failed...")
    }
  }
}
