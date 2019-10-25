
import { MatSnackBarModule, MatMenuModule, MatMenuTrigger, MatIconModule, MatTooltipModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
const exportedMaterial = [
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatMenuModule,
  MatIconModule,
  MatTooltipModule

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...exportedMaterial
  ],
  exports: [...exportedMaterial]
})
export class MaterialModule { }
