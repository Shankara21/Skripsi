import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexVariantComponent } from './index-variant.component';

describe('IndexVariantComponent', () => {
  let component: IndexVariantComponent;
  let fixture: ComponentFixture<IndexVariantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexVariantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
