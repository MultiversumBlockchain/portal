import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountChangedDialogComponent } from './account-changed-dialog.component';

describe('AccountChangedDialogComponent', () => {
  let component: AccountChangedDialogComponent;
  let fixture: ComponentFixture<AccountChangedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountChangedDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountChangedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
