import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from 'src/app/services/webSoket.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  sharedData: any;

  private socketSubscription!: Subscription;
  public top5ListItems: any = [];
  constructor(private websocketService: WebsocketService,
    private dataService: DataService) {
    this.connectToWebSocket();
  }

  connectToWebSocket() {
    this.socketSubscription = this.websocketService.connect().subscribe(
      async (message: MessageEvent) => {
        var str = await message?.data;
        var jsonObj = $.parseJSON(str);
        this.top5ListItems = jsonObj;
        console.log(this.top5ListItems)
        this.dataService.setSharedData(this.top5ListItems[this.top5ListItems.length - 1]);
      },
      (error) => console.error('WebSocket error:', error));
  }

  ngOnDestroy() {
    this.socketSubscription.unsubscribe();
    this.websocketService.close();
  }
}
