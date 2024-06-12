import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexDataStabilityComponent } from './index-data-stability.component';

describe('IndexDataStabilityComponent', () => {
  let component: IndexDataStabilityComponent;
  let fixture: ComponentFixture<IndexDataStabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexDataStabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexDataStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
