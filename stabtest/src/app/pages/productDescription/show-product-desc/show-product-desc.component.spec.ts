import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductDescComponent } from './show-product-desc.component';

describe('ShowProductDescComponent', () => {
  let component: ShowProductDescComponent;
  let fixture: ComponentFixture<ShowProductDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
