import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Theme } from './shared/services/theme/theme';
import { MapData } from './shared/services/mapData/map-data';
import { Configuration } from './shared/services/configuration/configuration';

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
  public configService = inject(Configuration);

  constructor() {
    this.mapDataService.loadAllData();

    effect(() => {
      if(!this.mapDataService.mainDataLoaded()) {
        //notify service
      }else {

        console.log(this.mapDataService.items())
        console.log(this.mapDataService.techs())
        console.log("itemtypes: ", this.configService.itemTypes())
        console.log("itemTypeStrings: ", this.configService.itemTypeStrings())
      }
    })
    effect(() => {
      
      const stored = localStorage.getItem('configCalc');
if (stored) {
  this.userConfig.set(JSON.parse(stored));
} else {
  this.userConfig.set(defaultvaConfig());
}

    });
    
  }
}
