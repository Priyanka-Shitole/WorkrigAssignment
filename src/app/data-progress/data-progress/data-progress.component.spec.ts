import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProgressComponent } from './data-progress.component';

describe('DataProgressComponent', () => {
  let component: DataProgressComponent;
  let fixture: ComponentFixture<DataProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
