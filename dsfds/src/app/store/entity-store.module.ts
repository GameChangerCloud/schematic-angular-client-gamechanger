import { NgModule } from '@angular/core';
import { EntityDataService } from '@ngrx/data'; // <-- import the NgRx Data data service registry

// GENERATED : import {<ENTITY_NAME>DataService} from './data-service/<entity_name>-data.service';
 
  import {MovieDataService} from './data-service/movie-data.service';
 
  import {ActorDataService} from './data-service/actor-data.service';
 
  import {StudioDataService} from './data-service/studio-data.service';
 

@NgModule({
  imports: [  ],
  providers: [ 
    // GENERATED : <ENTITY_NAME>DataService,
     
      MovieDataService,
     
      ActorDataService,
     
      StudioDataService,
     
    
  ] // <-- provide custom data service
})

export class EntityStoreModule {
  constructor(
    entityDataService: EntityDataService,
    // GENERATED : <ENTITY_NAME>DataService: <ENTITY_NAME>DataService,
     
      movieDataService: MovieDataService,
     
      actorDataService: ActorDataService,
     
      studioDataService: StudioDataService,
     
    
  ) {
    // GENERATED : entityDataService.registerService('<ENTITY_NAME>', <ENTITY_NAME>DataService);,
     
      entityDataService.registerService('Movie',movieDataService);
     
      entityDataService.registerService('Actor',actorDataService);
     
      entityDataService.registerService('Studio',studioDataService);
     
    
    // <-- register new dataService there
  }
}