import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongNetworkDialogComponent } from './wrong-network-dialog.component';

describe('WrongNetworkDialogComponent', () => {
  let component: WrongNetworkDialogComponent;
  let fixture: ComponentFixture<WrongNetworkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrongNetworkDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrongNetworkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
