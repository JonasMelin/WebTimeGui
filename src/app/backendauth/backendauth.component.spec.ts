import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendauthComponent } from './backendauth.component';

describe('BackendauthComponent', () => {
  let component: BackendauthComponent;
  let fixture: ComponentFixture<BackendauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackendauthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
