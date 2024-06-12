import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexLineComponent } from './index-line.component';

describe('IndexLineComponent', () => {
  let component: IndexLineComponent;
  let fixture: ComponentFixture<IndexLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
