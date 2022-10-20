import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-urlparams',
  templateUrl: './urlparams.component.html',
  styleUrls: ['./urlparams.component.css']
})
export class UrlparamsComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      console.log(params);
    });
  }

}
