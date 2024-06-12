import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDataStabilityComponent } from './edit-data-stability.component';

describe('EditDataStabilityComponent', () => {
  let component: EditDataStabilityComponent;
  let fixture: ComponentFixture<EditDataStabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDataStabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDataStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
