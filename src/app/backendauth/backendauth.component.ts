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
      console.log(params);

      if ('token' in params) {
        GlobalVariable.auth_token = params['token']
        this.getUserFromBackend(GlobalVariable.auth_token)
      }
    });
  }

  getUserFromBackend(token: string) {
    console.log('Get user from backend')
    this.restClient?.getUser(token).subscribe(retData => {
      console.log("Authenticated OK!")

      if ("firstName" in retData && "lastName" in retData && "token" in retData) {
        this.firstName = this.capitalizeFirstLetter(retData["firstName"])
        this.lastName = this.capitalizeFirstLetter(retData["lastName"])
        GlobalVariable.auth_token = retData["token"]
        GlobalVariable.authenticated = true
        this.authenticated = true
      } else {
        console.log("Corrupt response from backen?!")
      }
    });
  }

  capitalizeFirstLetter(input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }
}
