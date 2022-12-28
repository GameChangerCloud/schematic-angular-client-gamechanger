import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GamechangerParserService {

  types
  jsonGraphqlSchema
  constructor() { 
    this.types = [{"type":"ObjectTypeDefinition","typeName":"Employe","sqlTypeName":"employe","description":"","directives":[],"values":[],"fields":[{"name":"id","type":"ID","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int"},{"name":"email","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"firstName","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"lastName","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"login","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"password","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"workInfo","type":"Work","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":{"name":"Fk_workInfo_work_id","type":"int","noNull":false,"isForeignKey":true,"constraint":"FOREIGN KEY (\"Fk_workInfo_work_id\") REFERENCES \"work\" (\"Pk_work_id\")"},"relation":true,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int","relationType":"oneToMany"}],"implementedTypes":[],"relationList":[{"type":"Work","relation":"oneToMany","relatedFieldName":"empl"}],"queries":{"getAll":"`query getAllEmployes {employesPagination(skip: 0, take: 100) {totalCount nodes {id,email,firstName,lastName,login,password,workInfo{id}}}}`","getById":"`query employeGetDataById {employeGetDataById(employeId: \"id\",) {employe {id,email,firstName,lastName,login,password,workInfo{id}}}}`","create":"`mutation employeCreate {employeCreate(input: {id : entity.id email : entity.email firstName : entity.firstName lastName : entity.lastName login : entity.login password : entity.password workInfo : entity.workInfo }) {id,email,firstName,lastName,login,password,workInfo{id}}}}`","update":"`mutation employeUpdate {employeUpdate(employeId: \"entity.id\",input: {id : entity.id email : entity.email firstName : entity.firstName lastName : entity.lastName login : entity.login password : entity.password workInfo : entity.workInfo }) {id,email,firstName,lastName,login,password,workInfo{id}}}}`","delete":"`mutation {employeDelete (employeId:${id}) {id,email,firstName,lastName,login,password,workInfo{id}}}`"}},{"type":"ObjectTypeDefinition","typeName":"Work","sqlTypeName":"work","description":"","directives":[],"values":[],"fields":[{"name":"id","type":"ID","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int"},{"name":"job","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"salary","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"empl","type":"Employe","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":true,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":true,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":false,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int","relationType":"manyToOne"}],"implementedTypes":[],"relationList":[{"type":"Employe","relation":"manyToOne","relatedFieldName":"workInfo"}],"queries":{"getAll":"`query getAllWorks {worksPagination(skip: 0, take: 100) {totalCount nodes {id,job,salary,empl{id}}}}`","getById":"`query workGetDataById {workGetDataById(workId: \"id\",) {work {id,job,salary,empl{id}}}}`","create":"`mutation workCreate {workCreate(input: {id : entity.id job : entity.job salary : entity.salary empl : entity.empl }) {id,job,salary,empl{id}}}}`","update":"`mutation workUpdate {workUpdate(workId: \"entity.id\",input: {id : entity.id job : entity.job salary : entity.salary empl : entity.empl }) {id,job,salary,empl{id}}}}`","delete":"`mutation {workDelete (workId:${id}) {id,job,salary,empl{id}}}`"}}] ; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
    this.jsonGraphqlSchema = `type Employe {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  login: String!
  password: String!
  workInfo : Work
}

type Work {
  id: ID!
  job: String
  salary: String
  empl: [Employe]
}


`; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
  }

  getSchemaTypes(){
    return this.types
  }

  getGraphQlSchema(){
    return this.jsonGraphqlSchema
  }
}
