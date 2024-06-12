import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDataStabilityComponent } from './create-data-stability.component';

describe('CreateDataStabilityComponent', () => {
  let component: CreateDataStabilityComponent;
  let fixture: ComponentFixture<CreateDataStabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDataStabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDataStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
