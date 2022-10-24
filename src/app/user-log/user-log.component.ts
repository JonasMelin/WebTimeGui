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
  ongoingRecordings = false
  ongoingActivity = ""
  ongoingProject = ""
  ongoingExpireTimeH = 0
  ongoingExpireTimeMin = 0

  constructor(
    restClient: BackEndRestClient,
    sharedComponent: SharedComponent) { 
      this.restClient = restClient
      this.sharedComponent = sharedComponent
    }

  ngOnInit(): void {

    this.refreshDataFromBackend()

    setTimeout(() => {
      this.refreshDataFromBackend()
      this.sharedComponent.registerEmitterListener(this.refreshDataFromBackend.bind(this))
    }, 500) // sorry

    setInterval(this.refreshDataFromBackend.bind(this), 125 * 1000);
  }

  updateLog() {
    console.log("updateLog")

    const newActivityName = <HTMLInputElement>document.getElementById('selected_activity')
    console.log(newActivityName.textContent)
    const newProjectName = <HTMLInputElement>document.getElementById('selected_project')
    console.log(newProjectName.textContent)

    if (GlobalVariable.authenticated && newActivityName.textContent != null && newProjectName.textContent != null) {
      this.restClient?.updateLogging(GlobalVariable.auth_token, newActivityName.textContent, newProjectName.textContent, 1).subscribe(retData => {
      
      this.sharedComponent.showSnackbar("Logging started!", 2500)
      this.refreshDataFromBackend()
      }, error => {
        console.log("Could not start logging :-(")
        alert("Could not start logging?!")
      });
    } else {
      alert("You must select projects and activities!")
    }
  }

  stopLog() {
    console.log("stopLog")

    if (!GlobalVariable.authenticated) {
      console.log("user-log: stopLog(): Not authenticated.")
      return
    }

    this.restClient.putStopLogging(GlobalVariable.auth_token).subscribe(retData => {
      
      this.sharedComponent.showSnackbar("Logging stopped", 5000)
      this.refreshDataFromBackend()
      }, error => {
        alert("Could not stop logging?!")
      });
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

    this.restClient.getLastLog(GlobalVariable.auth_token).subscribe(retData => {
      
      if (retData == null) {return}

      if ("ongoing" in retData) { this.ongoingRecordings = retData["ongoing"]}
      if ("activity" in retData) { this.ongoingActivity = retData["activity"]}
      if ("project" in retData) { this.ongoingProject = retData["project"]}
      if ("expireTimeMs" in retData && retData["expireTimeMs"] != null) {
        const diffMs = retData["expireTimeMs"] - Date.now()
        var hour = Math.floor((diffMs / (1000 * 60)) / 60)
        var minute = Math.floor((diffMs / (1000 * 60)) % 60) + 1
        this.ongoingExpireTimeH = hour >= 0 ? hour : 0
        this.ongoingExpireTimeMin = minute >= 1 ? minute : 1
      }
    }, error => {
      console.log("DID NOT GET PROJECTS")
    });
  }

}
