import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  private snackBar: MatSnackBar;
  private emitterCallbackFunctions: (()=>void)[] = []

  constructor(snackBar: MatSnackBar) {
    this.snackBar = snackBar
    
  }

  ngOnInit(): void {
  }

  registerEmitterListener(arg:()=>void) {
    this.emitterCallbackFunctions.push(arg)
  }

  emit() {

    for (var callback of this.emitterCallbackFunctions) {
      try {
        callback()
      }catch (error) {
        console.log("Error in emit loop. Ignoring: " + error)
      }
    }
  }


  showSnackbar(message: string, timeoutMs: number) {
    let simpleSnackBarRef = this.snackBar.open(message, "OK", {
      duration: timeoutMs,
      panelClass: ['mat-toolbar', 'mat-primary']
    })
  }

  errorMsgToString(error: any) {
    if (error != null && "error" in error && "message" in error.error) {
      return error.error.message
    } else {
      return ""
    }
  }
}
