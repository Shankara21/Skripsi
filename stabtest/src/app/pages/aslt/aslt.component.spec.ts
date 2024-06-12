import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsltComponent } from './aslt.component';

describe('AsltComponent', () => {
  let component: AsltComponent;
  let fixture: ComponentFixture<AsltComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
