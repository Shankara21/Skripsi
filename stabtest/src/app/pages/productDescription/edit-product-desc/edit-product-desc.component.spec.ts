import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductDescComponent } from './edit-product-desc.component';

describe('EditProductDescComponent', () => {
  let component: EditProductDescComponent;
  let fixture: ComponentFixture<EditProductDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProductDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
