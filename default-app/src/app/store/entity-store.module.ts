import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry
import { EmployeDataService } from './data-service/employe-data.service';
import { WorkDataService } from './data-service/work-data.service';

@NgModule({
  imports: [  ],
  providers: [ 
    EmployeDataService,
    WorkDataService 
  ] // <-- provide custom data service
})

export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    employeDataService: EmployeDataService,
    workDataService: WorkDataService

  ) {
    entityDataService.registerService('Employe', employeDataService);
    entityDataService.registerService('Work', workDataService); 
    // <-- register it
  }
}