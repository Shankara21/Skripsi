import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductDescComponent } from './create-product-desc.component';

describe('CreateProductDescComponent', () => {
  let component: CreateProductDescComponent;
  let fixture: ComponentFixture<CreateProductDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
