import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorInterfaceComponent } from './advisor-interface.component';

describe('AdvisorInterfaceComponent', () => {
  let component: AdvisorInterfaceComponent;
  let fixture: ComponentFixture<AdvisorInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
