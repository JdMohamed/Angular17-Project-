import { Component, Inject } from '@angular/core';
import { DialogData } from '../list-livre/list-livre.component';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-dialog',
  standalone: true,
  imports: [MatDialogContent,MatButtonModule,MatDialogActions],
  template: `
    <mat-dialog-content>
  <h2>droit d'accès insuffisant</h2>
</mat-dialog-content>
<div mat-dialog-actions>
  <button mat-raised-button color="warn" (click)="onNoClick()">Ok</button>
</div>
  `,
  styles: ``
})
export class MyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
