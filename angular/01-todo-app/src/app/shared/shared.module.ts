import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent], // made available to other modules
})

// other modules don't have bootstrap array, only app module has
export class SharedModule {}
