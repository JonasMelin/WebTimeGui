import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagetabComponent } from './managetab.component';

describe('ManagetabComponent', () => {
  let component: ManagetabComponent;
  let fixture: ComponentFixture<ManagetabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagetabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagetabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
