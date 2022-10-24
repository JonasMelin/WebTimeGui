import { Component, OnInit, Input, Injectable } from '@angular/core';
import { GlobalVariable } from '../globals';
import { BackEndRestClient } from '../service/BackEndRestClient';
import { SharedComponent } from '../shared/shared.component';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-user-log',
  templateUrl: './user-log.component.html',
  styleUrls: ['./user-log.component.css']
})
export class UserLogComponent implements OnInit {


  private restClient: BackEndRestClient;
  private sharedComponent: SharedComponent;

  disableSelect: boolean = false
  activityList: string[] = []
  projectList: string[] = []

  constructor(
    restClient: BackEndRestClient,
    sharedComponent: SharedComponent) { 
      this.restClient = restClient
      this.sharedComponent = sharedComponent
    }

  

  ngOnInit(): void {

    this.refreshDataFromBackend()

    
  }

  updateLog() {
    console.log("updateLog")

    const newActivityName = <HTMLInputElement>document.getElementById('selected_project')
    console.log(newActivityName.value)
  }

  refreshDataFromBackend() {

    if (!GlobalVariable.authenticated) {
      console.log("user-log: ngOnInit(): Not authenticated.")
      return
    }

    this.restClient?.getActivities(GlobalVariable.auth_token).subscribe(retData => {
      
      if (retData != null && "activityTypes" in retData) {
        this.activityList = retData["activityTypes"]
      }
    }, error => {
      console.log("DID NOT GET ACTIVITIES")
    });

    this.restClient?.getProjects(GlobalVariable.auth_token).subscribe(retData => {
      
      if (retData != null && "projects" in retData) {
        this.projectList = retData["projects"]
      }
    }, error => {
      console.log("DID NOT GET PROJECTS")
    });
  }

}
