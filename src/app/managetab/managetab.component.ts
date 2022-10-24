import { Component, OnInit } from '@angular/core';
import { BackEndRestClient } from '../service/BackEndRestClient';
import { GlobalVariable } from '../globals';
import { SharedComponent } from '../shared/shared.component';

@Component({
  selector: 'app-managetab',
  templateUrl: './managetab.component.html',
  styleUrls: ['./managetab.component.css']
})
export class ManagetabComponent implements OnInit {

  private restClient: BackEndRestClient;
  private sharedComponent: SharedComponent;

  constructor(
      restClient: BackEndRestClient,
      sharedComponent: SharedComponent) {
    this.restClient = restClient
    this.sharedComponent = sharedComponent
  }

  ngOnInit(): void {    
  }

  newProject() {
    
    const newProjectName = <HTMLInputElement>document.getElementById('new_project_form')
    console.log("Registerring new project name: " + newProjectName)
    this.restClient.addProject(GlobalVariable.auth_token, newProjectName.value).subscribe(retData => {
      this.sharedComponent.showSnackbar("Project created successfully", 5000)
      this.sharedComponent.emit()
    }, error => {
      alert("Could not create project: " + this.sharedComponent.errorMsgToString(error))
    });
  }

  newActivity() {
    const newActivityName = <HTMLInputElement>document.getElementById('new_activity_form')
    console.log("Registerring new project name: " + newActivityName.value)
    this.restClient.addActivity(GlobalVariable.auth_token, newActivityName.value).subscribe(retData => {
      this.sharedComponent.showSnackbar("Activity created successfully", 5000)
      this.sharedComponent.emit()
    }, error => {
      alert("Could not create activity: " + this.sharedComponent.errorMsgToString(error))
    })
  }
}
