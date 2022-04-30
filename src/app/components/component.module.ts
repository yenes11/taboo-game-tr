import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    CardComponent,
  ],
  exports: [
    CardComponent
  ],
  imports: [
    IonicModule
  ]
})
export class ComponentsModule {}
