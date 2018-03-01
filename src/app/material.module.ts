
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
      MatButtonModule,
      MatCardModule,
      MatToolbarModule,
      MatDialogModule,
      BrowserAnimationsModule,
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