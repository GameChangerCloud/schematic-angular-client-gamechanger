import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { GamechangerAdminEntityDialogComponent } from '../../component/gamechanger-admin-entity-dialog/gamechanger-admin-entity-dialog.component'
import { UpperCasePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GamechangerParserService } from '../../services/gamechanger-parser.service';
<% for (let i = 0; i < types.length; i++) { %>import {<%=types[i].typeName%>Service} from 'src/app/store/service/<%=camelize(types[i].typeName)%>.service';<% } %> 

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
    <% for (let i = 0; i < types.length; i++) { %>private <%=decamelize(types[i].typeName)%>Service : <%=types[i].typeName%>Service,<% } %> 
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

  /**
   * Get entity and parse Columns
   * @param entity entity to parse
   */
  getEntitiesColumn(entity:any):string[]{
    let entitiesColumn:any = []
    this.types.forEach(type => {
      if(type.typeName === this.capitalizeFirstLetter(entity)){
        for (let i = 0; i < type.fields.length; i++) {
          const field = type.fields[i].name;
          entitiesColumn.push(field)
        }
      }
    })
    
    return entitiesColumn
  }

  /**
   * Opend Entity Dialog Component
   * @param type launch DynamicFormModule add/update mode
   */
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

  /**
   * Check if entity have nodes
   * @param entity 
   * @return true | false
   */
  isNodes(entity : any): boolean {
    return entity.hasOwnProperty('nodes') ? true : false
  }

  /**
   * Supported Empty type :
   * null, nodes array checking
   * @param entity 
   * @returns true | false 
   */
  isEmpty(entity: any): boolean{
    let isEmpty:boolean;

    if (entity === null) {
      isEmpty = true
    } else {
      isEmpty = false
      if(entity.hasOwnProperty('nodes') ){
        entity.nodes.length === 0 ? isEmpty = true : isEmpty = false 
      }
    }
  
    return isEmpty
  }

  capitalizeFirstLetter(string:string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
}
