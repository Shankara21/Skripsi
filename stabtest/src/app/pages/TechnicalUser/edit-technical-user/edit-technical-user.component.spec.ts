import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnicalUserComponent } from './edit-technical-user.component';

describe('EditTechnicalUserComponent', () => {
  let component: EditTechnicalUserComponent;
  let fixture: ComponentFixture<EditTechnicalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTechnicalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTechnicalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
