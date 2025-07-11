import {
  Component,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  Output,
  Signal,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { MapData } from '../../../../shared/services/mapData/map-data';
import { KeyValuePipe } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { Item } from '../../../../shared/models/core/Item';
import { RecipeTreeGenerator } from '../../../../shared/services/recipeTreeGenerator/recipe-tree-generator';
@Component({
  selector: 'app-item-selector',
  imports: [Dialog, ButtonModule,TabsModule, KeyValuePipe,TooltipModule],
  templateUrl: './item-selector.html',
  styleUrl: './item-selector.css',
})
export class ItemSelector {
  // model signal wraps Input and Output decorators
  open = model<boolean>(false);
  public recipeTreeGenerator = inject(RecipeTreeGenerator);
  public mapDataService = inject(MapData);

  saveSelectedItem(item: Item) {
    this.recipeTreeGenerator.selectedItem.set(item);
    this.open.set(false);
  }
}
