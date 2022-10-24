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
    const newProjectName = <HTMLInputElement>document.getElementById('selected_project')
    const expireH = <HTMLInputElement>document.getElementById('expire_h')
    const expireMin = <HTMLInputElement>document.getElementById('expire_min')

    if (expireH.value != null && expireH.value!= null &&  newActivityName.textContent != null && newActivityName.textContent != "" && newProjectName.textContent != null && newProjectName.textContent != "") {

      var parsedH = 0
      var parsedMin = 0
      var totalMin = 0
      try {
        parsedH = parseInt(expireH.value, 10);
        parsedMin = parseInt(expireMin.value, 10);
        if (parsedH < 0) {throw new Error("Expire hour must be potitive...")}
        if (parsedMin < 0) {throw new Error("Expire minute must be potitive...")}
        if (parsedMin > 60) {throw new Error("Expire minute must be less than 60...")}
        if (parsedMin == 0 && parsedH == 0) {throw new Error("Set expire greater than 0...")}
        totalMin = parsedH * 60 + parsedMin
      } catch (error) {
        alert("Bad expire numbers. Use positive integers! " + error)
        return
      }

      //var expireMinTot = expireH.value * 60

      this.restClient?.updateLogging(GlobalVariable.auth_token, newActivityName.textContent, newProjectName.textContent, totalMin).subscribe(retData => {
      
      this.sharedComponent.showSnackbar("Logging started!", 2500)
      this.refreshDataFromBackend()
      }, error => {
        console.log("Could not start logging :-(")
        alert("Could not start logging?! " + this.sharedComponent.errorMsgToString(error))
      });
    } else {
      alert("You must select projects and activities, and proper expire values...")
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
