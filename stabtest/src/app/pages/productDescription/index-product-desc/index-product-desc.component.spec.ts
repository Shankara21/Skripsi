import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProductDescComponent } from './index-product-desc.component';

describe('IndexProductDescComponent', () => {
  let component: IndexProductDescComponent;
  let fixture: ComponentFixture<IndexProductDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexProductDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexProductDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
