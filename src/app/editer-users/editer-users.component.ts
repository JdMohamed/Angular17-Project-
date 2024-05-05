import { Component, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { UserP } from '../user';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { LivreService } from '../livre.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { DialogData } from '../list-livre/list-livre.component';
@Component({
  selector: 'app-editer-users',
  standalone: true,
  imports: [FormsModule,MatSlideToggleModule,MatButtonModule, CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './editer-users.component.html',
  styleUrl: 'editer-users.component.css'
})
export class EditerUsersComponent {
  isChecked = true;
  dataSource: MatTableDataSource<UserP>;
  userList:UserP[];
  titre: string;
  id:number
  user:UserP
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[]
  constructor(private router: Router,
              private livreService: LivreService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private http:HttpClient,
              private auth: AuthService) {}
 openDialog(user:UserP): void {
    const dialogRef = this.dialog.open(MyDialogComp, {
      data: {id:user.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getListUsers();
    });
  }
  getListUsers(){
    this.livreService.getUserList().subscribe((userList)=>{
      this.userList = userList
      this.dataSource = new MatTableDataSource<UserP>(this.userList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;}
      );
  }
  ngOnInit(): void {
      this.displayedColumns= ['id', 'name', 'email', 'is_superuser'];
      this.getListUsers();
    }
  ngAfterViewInit() {
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}

@Component({
  selector: 'app-my-dialog',
  standalone: true,
  imports: [EditerUsersComponent,MatDialogContent,MatButtonModule,MatDialogActions],
  template: `
    <mat-dialog-content>
  <h2>Confirm add this user to administrator ?</h2>
</mat-dialog-content>
<div mat-dialog-actions>
  <button mat-raised-button color="primary" (click)="updateUser(data.id)">Oui</button>
  <button mat-raised-button color="primary" (click)="onNoClick()">Non</button>
</div>
  `,
  styles: ``
})
export class MyDialogComp {
  constructor(private livreservice: LivreService,
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateUser(id:Number){
    this.dialogRef.close();
    this.livreservice.updateUser(id).subscribe({
        next: (res) => {
          ;
        },
        error: console.log,
      });
  }
}

