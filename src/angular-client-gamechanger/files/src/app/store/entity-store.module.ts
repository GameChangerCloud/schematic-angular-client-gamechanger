import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry

// GENERATED : import {<ENTITY_NAME>DataService} from './data-service/<entity_name>-data.service';
<% for (let i = 0; i < types.length; i++) { %> 
  import {<%=types[i].typeName%>DataService} from './data-service/<%=camelize(types[i].typeName)%>-data.service';
<% } %> 

@NgModule({
  imports: [  ],
  providers: [ 
    // GENERATED : <ENTITY_NAME>DataService,
    <% for (let i = 0; i < types.length; i++) { %> 
      <%=types[i].typeName%>DataService,
    <% } %> 
    
  ] // <-- provide custom data service
})

export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    // GENERATED : <ENTITY_NAME>DataService: <ENTITY_NAME>DataService,
    <% for (let i = 0; i < types.length; i++) { %> 
      <%=camelize(types[i].typeName)%>DataService: <%=types[i].typeName%>DataService,
    <% } %> 
    
  ) {
    // GENERATED : entityDataService.registerService('<ENTITY_NAME>', <ENTITY_NAME>DataService);,
    <% for (let i = 0; i < types.length; i++) { %> 
      entityDataService.registerService('<%=types[i].typeName%>',<%=camelize(types[i].typeName)%>DataService);
    <% } %> 
    
    // <-- register new dataService there
  }
}