import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlparamsComponent } from './urlparams.component';

describe('UrlparamsComponent', () => {
  let component: UrlparamsComponent;
  let fixture: ComponentFixture<UrlparamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UrlparamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlparamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
