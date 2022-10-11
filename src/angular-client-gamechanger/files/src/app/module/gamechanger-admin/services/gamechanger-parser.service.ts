import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GamechangerParserService {

  schemaTypes
  graphqlSchema
  constructor() { 
    this.schemaTypes = '' ; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
    this.graphqlSchema = ''; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
  }

  getSchemaTypes(){
    return this.schemaTypes
  }

  getGraphQlSchema(){
    return this.graphqlSchema
  }
}
