import {EntityDataModule,EntityMetadataMap, DefaultDataServiceConfig} from  '@ngrx/data';


const entityMetadata: EntityMetadataMap = { 
  <% for (const type in types) { %> 
    <%=type%> : {},
  <% } %> 
} ;


const pluralNames =  { 
  <% for (const type in types) { %> 
    <%=type%> : '<%=type%>s',
  <% } %> 
}

export const entityConfig = {
  entityMetadata,
  pluralNames
};