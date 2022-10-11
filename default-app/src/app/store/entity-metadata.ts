import {EntityDataModule,EntityMetadataMap, DefaultDataServiceConfig} from  '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Employe: {},
  Work: {}
};
const pluralNames = { Employe: 'Employes' , Work: 'Works'};

export const entityConfig = {
  entityMetadata,
  pluralNames
};

