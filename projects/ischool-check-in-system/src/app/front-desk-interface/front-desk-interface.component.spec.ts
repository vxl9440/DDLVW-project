import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDeskInterfaceComponent } from './front-desk-interface.component';

describe('FrontDeskInterfaceComponent', () => {
  let component: FrontDeskInterfaceComponent;
  let fixture: ComponentFixture<FrontDeskInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontDeskInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDeskInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
