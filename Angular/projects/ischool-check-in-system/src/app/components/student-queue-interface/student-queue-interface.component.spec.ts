import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentQueueInterfaceComponent } from './student-queue-interface.component';

describe('StudentQueueInterfaceComponent', () => {
  let component: StudentQueueInterfaceComponent;
  let fixture: ComponentFixture<StudentQueueInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentQueueInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentQueueInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
