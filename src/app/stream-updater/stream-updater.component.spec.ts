import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamUpdaterComponent } from './stream-updater.component';

describe('StreamUpdaterComponent', () => {
  let component: StreamUpdaterComponent;
  let fixture: ComponentFixture<StreamUpdaterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreamUpdaterComponent]
    });
    fixture = TestBed.createComponent(StreamUpdaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
