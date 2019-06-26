import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalVariablesComponent } from './global-variables.component';

describe('GlobalVariablesComponent', () => {
  let component: GlobalVariablesComponent;
  let fixture: ComponentFixture<GlobalVariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalVariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
