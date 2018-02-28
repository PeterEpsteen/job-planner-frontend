
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';

@NgModule({
  imports: [
      MatButtonModule,
      MatCardModule,
      MatToolbarModule
    ],
  exports: [
      MatButtonModule,
      MatCardModule,
      MatToolbarModule
],
})
export class MaterialModule { }