import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

const sharedModules = [MatIconModule, MatButtonModule, MatSelectModule, MatRippleModule, MatInputModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...sharedModules],
  exports: [...sharedModules],
})
export class SharedModule {}
