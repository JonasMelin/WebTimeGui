import { Component, OnInit } from '@angular/core';
import { BackEndRestClient } from '../service/BackEndRestClient';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  private restClient: BackEndRestClient;

  user_message: string = ""
  registration_complete: boolean = false

  constructor(restClient: BackEndRestClient) { 
    this.restClient = restClient
  }


  ngOnInit(): void {
  }

  submit() {
    const email = <HTMLInputElement>document.getElementById('email_form')
    const firstName = <HTMLInputElement>document.getElementById('firstname_form')
    const lastName = <HTMLInputElement>document.getElementById('lastname_form')
    console.log(firstName.value + " " + lastName.value + " " + email.value)
    this.restClient.registerUser(firstName.value, lastName.value, email.value).subscribe(retData => {
      console.log("REGISTERRED OK! " + retData)
      if ("token" in retData) {
        console.log("TOKEN: " + retData["token"])
        this.user_message = "http://127.0.0.1:4200/?token=" + retData["token"]
        this.registration_complete = true
      }
    }, error => {
      console.log("REGISTERRED FAILED!")
    });
  }
}
