import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeService } from 'src/app/store/service/employe.service';
import { WorkService } from 'src/app/store/service/work.service';
import { GamechangerAdminEntityDialogComponent } from '../../component/gamechanger-admin-entity-dialog/gamechanger-admin-entity-dialog.component'
import { Employe } from 'src/app/store/models/employe';
import { UpperCasePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gamechanger-admin-models-layout',
  templateUrl: './gamechanger-admin-models-layout.component.html',
  styleUrls: ['./gamechanger-admin-models-layout.component.scss']
})
export class GamechangerAdminModelsLayoutComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  types = {
      "Employe": {
        "type": "ObjectTypeDefinition",
        "fields": [
          {
            "name": "id",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": true,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "ID"
          },
          {
            "name": "email",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": true,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "firstName",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": false,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "lastName",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": false,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "login",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": true,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "password",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": true,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "workInfo",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": false,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "Work"
          }
        ],
        "values": [],
        "types": [],
        "implementedTypes": [],
        "directives": []
      },
      "Work": {
        "type": "ObjectTypeDefinition",
        "fields": [
          {
            "name": "id",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": true,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "ID"
          },
          {
            "name": "job",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": false,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "salary",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": false,
            "isArray": false,
            "noNullArrayValues": false,
            "type": "String"
          },
          {
            "name": "empl",
            "arguments": [],
            "isDeprecated": false,
            "directives": [],
            "noNull": false,
            "isArray": true,
            "noNullArrayValues": false,
            "type": "Employe"
          }
        ],
        "values": [],
        "types": [],
        "implementedTypes": [],
        "directives": []
      }
    }
  activeEntity:string | null ;
  activeEntities$: Observable<[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = [];
  entityColumns: string[] = []
  dataSource = new MatTableDataSource([]);


  constructor(private route: ActivatedRoute,public dialog: MatDialog,private employeService: EmployeService,private workService: WorkService) { 
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
    
    let entitiesColumn = []
    let entity = eval('this.types.'+this.capitalizeFirstLetter(activeEntity))
  
    for (let i = 0; i < entity.fields.length; i++) {
      const field = entity.fields[i].name;
      entitiesColumn.push(field)
    }

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
