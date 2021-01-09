import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../services/network.service';

declare let window: any;
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-wrong-network-dialog',
  templateUrl: './wrong-network-dialog.component.html',
  styleUrls: ['./wrong-network-dialog.component.css']
})
export class WrongNetworkDialogComponent implements OnInit {

  constructor(
    private networkService : NetworkService
  ) { }

  ngOnInit(): void {

  }

  getCurrentNetwork() {
    return environment.NETWORKS[this.networkService.getNetworkVersion()];
  }

  getRequiredNetwork() {
    return environment.NETWORKS[environment.REQUIRED_NETWORK];
  }

  reloadApp() {
    window.location.reload();
  }
}
