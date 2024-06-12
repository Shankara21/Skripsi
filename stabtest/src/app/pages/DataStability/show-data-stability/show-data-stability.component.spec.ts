import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataStabilityComponent } from './show-data-stability.component';

describe('ShowDataStabilityComponent', () => {
  let component: ShowDataStabilityComponent;
  let fixture: ComponentFixture<ShowDataStabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowDataStabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowDataStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
