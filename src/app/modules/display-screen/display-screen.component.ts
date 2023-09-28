import { AfterViewInit, Component, OnChanges } from '@angular/core';
import { WebsocketService } from 'src/app/services/webSoket.service';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { data } from 'jquery';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.scss']
})
export class DisplayScreenComponent {
  data: any;
  currentDateTime!: Date;
  constructor(private dataservice: DataService) {
    setInterval(() => {
      this.data = this.dataservice.getSharedData();
      this.currentDateTime = new Date(Date.now());
      // console.log("data.....................", this.data, "type", typeof(this.data))
    }, 3000)
  }
}
