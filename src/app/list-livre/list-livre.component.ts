import { Component, ViewChild, AfterViewInit, OnInit, Inject} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Livre, auteur } from '../livre';
import { LivreService } from '../livre.service';
import { CommonModule } from '@angular/common';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService} from '../auth.service';
import { UserP } from '../user';
import { HttpClient } from '@angular/common/http';
export interface DialogData {
  titre: string;
  id: number
}


/** Constants used to fill up our data base. */

@Component({
  selector: 'app-list-livre',
  standalone: true,
  imports: [MatButtonModule, CommonModule,MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule],
  templateUrl: './list-livre.component.html',
  styleUrl: 'list-livre.component.css'
})
export class ListLivreComponent implements AfterViewInit, OnInit{


  
  dataSource: MatTableDataSource<Livre>;
  livreList:Livre[];
  Object:auteur
  titre: string;
  id:number
  Su:boolean;
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
 openDialog(livre:Livre): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: {titre: livre.titre,id:livre.id},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getListLivre();
    });
  }
  getListLivre(){
    this.livreService.getLivreList().subscribe((livreList)=>{
      this.livreList = livreList
      this.dataSource = new MatTableDataSource<Livre>(this.livreList)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;}
      );
  }
  ngOnInit(): void {
    const userS=localStorage.getItem('user')
    if ( userS!== null) {
      const userData=JSON.parse(userS)
    if(!userData.is_superuser){
      this.displayedColumns= ['id', 'titre', 'auteurs', 'categories', 'isbn', 'synopsis'];
      this.getListLivre();
    }else{
      this.displayedColumns= ['id', 'titre', 'auteurs', 'categories', 'isbn', 'synopsis','action'];
      this.getListLivre();
    }};
    
    
  
    
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
  editLivre(livre:Livre){
    this.router.navigate(['edit/livre', livre.id])
  }

}


  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'dialog-overview-example-dialog.html',
    standalone: true,
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatDialogTitle,
      MatDialogContent,
      MatDialogActions,
      MatDialogClose,
      MatButtonModule,
      ListLivreComponent
    ],
  })
  export class DialogOverviewExampleDialog {
    constructor(
      public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
      private livreService:LivreService,
      private router: Router
    ) {}
    
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    deleteLivre(livreID: number){
      this.dialogRef.close();
      this.livreService.deleteLivre(livreID).subscribe({
        next: (res) => {
          ;
        },
        error: console.log,
      });
     }
   
  }

  