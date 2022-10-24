import { Component, OnInit } from '@angular/core';
import { BackEndRestClient } from '../service/BackEndRestClient';
import { SharedComponent } from '../shared/shared.component';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  private restClient: BackEndRestClient;
  private sharedComponent: SharedComponent;

  user_message: string = ""
  registration_complete: boolean = false

  constructor(
      restClient: BackEndRestClient,
      sharedComponent: SharedComponent
      ) { 
      this.restClient = restClient 
      this.sharedComponent = sharedComponent
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
        this.user_message = "http://188.149.192.52:7612/?token=" + retData["token"]
        this.registration_complete = true
        this.sharedComponent.showSnackbar("User Registered OK!", 5000)
      }
    }, error => {
      alert("Could not register user: " + this.sharedComponent.errorMsgToString(error))
    });
  }

  
}
