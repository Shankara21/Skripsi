import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDataStabilityComponent } from './transaction-data-stability.component';

describe('TransactionDataStabilityComponent', () => {
  let component: TransactionDataStabilityComponent;
  let fixture: ComponentFixture<TransactionDataStabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionDataStabilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDataStabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
