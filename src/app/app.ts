import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Theme } from './shared/services/theme/theme';
import { MapData } from './shared/services/mapData/map-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'dysonSphereCenter';
  private theme = inject(Theme);
  public mapDataService = inject(MapData);

  constructor() {
    this.mapDataService.loadAllData();

    effect(() => {
      if(!this.mapDataService.mainDataLoaded()) {
        //notify service
      }
      console.log(this.mapDataService.items())
      console.log(this.mapDataService.techs())
    })
  }
}
