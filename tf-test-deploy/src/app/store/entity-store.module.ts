import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry

// GENERATED : import {<ENTITY_NAME>DataService} from './data-service/<entity_name>-data.service';
 
  import {EmployeDataService} from './data-service/employe-data.service';
 
  import {WorkDataService} from './data-service/work-data.service';
 

@NgModule({
  imports: [  ],
  providers: [ 
    // GENERATED : <ENTITY_NAME>DataService,
     
      EmployeDataService,
     
      WorkDataService,
     
    
  ] // <-- provide custom data service
})

export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    // GENERATED : <ENTITY_NAME>DataService: <ENTITY_NAME>DataService,
     
      employeDataService: EmployeDataService,
     
      workDataService: WorkDataService,
     
    
  ) {
    // GENERATED : entityDataService.registerService('<ENTITY_NAME>', <ENTITY_NAME>DataService);,
     
      entityDataService.registerService('Employe',employeDataService);
     
      entityDataService.registerService('Work',workDataService);
     
    
    // <-- register new dataService there
  }
}