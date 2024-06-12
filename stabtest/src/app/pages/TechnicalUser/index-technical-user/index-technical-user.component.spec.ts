import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexTechnicalUserComponent } from './index-technical-user.component';

describe('IndexTechnicalUserComponent', () => {
  let component: IndexTechnicalUserComponent;
  let fixture: ComponentFixture<IndexTechnicalUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexTechnicalUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexTechnicalUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
