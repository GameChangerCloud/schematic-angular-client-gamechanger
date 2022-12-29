import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GamechangerParserService {

  types
  jsonGraphqlSchema
  constructor() { 
    this.types = <%= jsonTypes %> ; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
    this.jsonGraphqlSchema = `<%= jsonGraphqlSchema %>`; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
  }

  getSchemaTypes(){
    return this.types
  }

  getJsonGraphQlSchema(){
    return this.jsonGraphqlSchema
  }
}
