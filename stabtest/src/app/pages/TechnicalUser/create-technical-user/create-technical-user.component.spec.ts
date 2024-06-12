import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTechnicalUserComponent } from './create-technical-user.component';

describe('CreateTechnicalUserComponent', () => {
  let component: CreateTechnicalUserComponent;
  let fixture: ComponentFixture<CreateTechnicalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTechnicalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTechnicalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
