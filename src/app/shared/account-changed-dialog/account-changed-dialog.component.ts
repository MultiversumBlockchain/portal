import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-changed-dialog',
  templateUrl: './account-changed-dialog.component.html',
  styleUrls: ['./account-changed-dialog.component.css']
})
export class AccountChangedDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  reloadApp() {
    window.location.reload();
  }
}
