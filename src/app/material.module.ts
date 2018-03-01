
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  imports: [
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatDialogModule,
      BrowserAnimationsModule
    ],
  exports: [
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatDialogModule,
      BrowserAnimationsModule
],
})
export class MaterialModule { }