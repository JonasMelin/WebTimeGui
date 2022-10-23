import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.css']
})
export class SharedComponent implements OnInit {

  private snackBar: MatSnackBar;

  constructor(snackBar: MatSnackBar) { 
    this.snackBar = snackBar
    
  }

  ngOnInit(): void {
  }

  showSnackbar(message: string, timeoutMs: number) {
    let simpleSnackBarRef = this.snackBar.open(message, "OK")
    setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), timeoutMs);
  }

  errorMsgToString(error: any) {
    if (error != null && "error" in error && "message" in error.error) {
      return error.error.message
    } else {
      return ""
    }
  }
}
