import {EntityDataModule,EntityMetadataMap, DefaultDataServiceConfig} from  '@ngrx/data';


const entityMetadata: EntityMetadataMap = { 
   
    Movie : {},
   
    Actor : {},
   
    Studio : {},
   
} ;


const pluralNames =  { 
   
    Movie : 'Movies',
   
    Actor : 'Actors',
   
    Studio : 'Studios',
   
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};