import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertRowComponent } from './insert-row.component';

describe('InsertRowComponent', () => {
  let component: InsertRowComponent;
  let fixture: ComponentFixture<InsertRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
