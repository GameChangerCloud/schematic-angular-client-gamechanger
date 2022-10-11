import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry

// GENERATED : import {<ENTITY_NAME>DataService} from './data-service/<entity_name>-data.service';
<% for (const type in types) { %> 
  import {<%=type%>DataService} from './data-service/<%=camelize(type)%>-data.service';
<% } %> 

@NgModule({
  imports: [  ],
  providers: [ 
    // GENERATED : <ENTITY_NAME>DataService,
    <% for (const type in types) { %> 
      <%=type%>DataService,
    <% } %> 
    
  ] // <-- provide custom data service
})

export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    // GENERATED : <ENTITY_NAME>DataService: <ENTITY_NAME>DataService,
    <% for (const type in types) { %> 
      <%=camelize(type)%>DataService: <%=type%>DataService,
    <% } %> 
    
  ) {
    // GENERATED : entityDataService.registerService('<ENTITY_NAME>', <ENTITY_NAME>DataService);,
    <% for (const type in types) { %> 
      entityDataService.registerSsrvice('<%=type%>',<%=camelize(type)%>DataService);
    <% } %> 
    
    // <-- register new dataService there
  }
}