import {EntityDataModule,EntityMetadataMap, DefaultDataServiceConfig} from  '@ngrx/data';


const entityMetadata: EntityMetadataMap = { 
  <% for (let i = 0; i < types.length; i++) { %> 
    <%=types[i].typeName%> : {},
  <% } %> 
} ;


const pluralNames =  { 
  <% for (let i = 0; i < types.length; i++) { %> 
    <%=types[i].typeName%> : '<%=types[i].typeName%>s',
  <% } %> 
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};