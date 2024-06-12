import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoringRoomComponent } from './monitoring-room.component';

describe('MonitoringRoomComponent', () => {
  let component: MonitoringRoomComponent;
  let fixture: ComponentFixture<MonitoringRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitoringRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonitoringRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
