import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
<% for (let i = 0; i < types.length; i++) { %> 
import {<%=types[i].typeName%>Service} from 'src/app/store/service/<%=camelize(types[i].typeName)%>.service';
<% } %> 
import { GamechangerAdminEntityDialogComponent } from '../../component/gamechanger-admin-entity-dialog/gamechanger-admin-entity-dialog.component'
import { UpperCasePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GamechangerParserService } from '../../services/gamechanger-parser.service';

@Component({
  selector: 'app-gamechanger-admin-models-layout',
  templateUrl: './gamechanger-admin-models-layout.component.html',
  styleUrls: ['./gamechanger-admin-models-layout.component.scss']
})

export class GamechangerAdminModelsLayoutComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  types = this.gamechangerParserService.getSchemaTypes()
  activeEntity:string | null ;
  activeEntities$: Observable<[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = [];
  entityColumns: string[] = []
  dataSource = new MatTableDataSource([]);


  constructor(
    public gamechangerParserService: GamechangerParserService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    <% for (let i = 0; i < types.length; i++) { %> 
    private <%=decamelize(types[i].typeName)%>Service : <%=types[i].typeName%>Service,
    <% } %> 
  ) { 
    this.activeEntity = this.route.snapshot.paramMap.get('model');
    this.activeEntities$ = eval(`this.${this.activeEntity}Service.entities$;`)
    this.loading$ = eval(`this.${this.activeEntity}Service.loading$;`)
    this.entityColumns = this.getEntitiesColumn(this.activeEntity);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap=>{
    
      this.activeEntity = paramMap.get('model')
      this.activeEntities$ = eval(`this.${this.activeEntity}Service.entities$;`)
      this.loading$ = eval(`this.${this.activeEntity}Service.loading$;`)

      this.displayedColumns = []
      this.entityColumns = this.getEntitiesColumn(this.activeEntity);
      for (let i = 0; i < this.entityColumns.length; i++) {
        const column = this.entityColumns[i];
        this.displayedColumns.push(column)
      }
      this.displayedColumns.push('update','delete') 
      this.getEntities()
      this.activeEntities$.subscribe(result =>{ 
        console.log(result);
        
        this.dataSource = new MatTableDataSource(result)
        this.dataSource.paginator = this.paginator;      
      })
    })  
  }

  getEntities(): void {
    eval(`this.${this.activeEntity}Service.getAll();`)
  }

  deleteEntity(entity: any) {
    eval(`this.${this.activeEntity}Service.delete(entity);`)    

  }

  updateEntities(entity:any) {
    eval(`this.${this.activeEntity}Service.update(entity);`)  
  }

  getEntitiesColumn(activeEntity:any):string[]{
    
    let entitiesColumn:any = []

    this.types.forEach(type => {
      if(type.typeName === this.capitalizeFirstLetter(activeEntity)){
        for (let i = 0; i < type.fields.length; i++) {
          const field = type.fields[i].name;
          entitiesColumn.push(field)
        }
      }
    })
    
    return entitiesColumn
  }

  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  openDialog(type: 'add' |'update', entity?: {}): void {

    const dialogRef = this.dialog.open(GamechangerAdminEntityDialogComponent, {
      width: '250px',
      data: {
        entityName: this.activeEntity,
        type: type,
        entity: entity
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  isArray(obj : any ) {
    return Array.isArray(obj)
  }
}
