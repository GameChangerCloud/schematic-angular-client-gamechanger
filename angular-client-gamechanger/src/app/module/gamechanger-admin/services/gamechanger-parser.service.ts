import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GamechangerParserService {

  types
  jsonGraphqlSchema
  constructor() { 
    this.types = [{"type":"ObjectTypeDefinition","typeName":"Movie","sqlTypeName":"movie","description":"","directives":[],"values":[],"fields":[{"name":"id","type":"ID","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int"},{"name":"title","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"rating","type":"Float","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"float8"},{"name":"actors","type":"Actor","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":true,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":true,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":false,"joinTable":{"state":true,"name":"Movie_Actor_actors","contains":[{"fieldName":"actor_id","type":"Actor","constraint":"FOREIGN KEY (\"actor_id\") REFERENCES \"actor\" (\"Pk_actor_id\")"},{"fieldName":"movie_id","type":"Movie","constraint":"FOREIGN KEY (\"movie_id\") REFERENCES \"movie\" (\"Pk_movie_id\")"}]},"oneToOneInfo":null,"sqlType":"int","relationType":"manyToManyJoin"},{"name":"studio","type":"Studio","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":{"name":"Fk_studio_studio_id","type":"int","noNull":true,"isForeignKey":true,"constraint":"FOREIGN KEY (\"Fk_studio_studio_id\") REFERENCES \"studio\" (\"Pk_studio_id\")"},"relation":true,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int","relationType":"oneOnly"}],"implementedTypes":[],"relationList":[{"type":"Actor","relation":"manyToManyJoin","relatedFieldName":"movies"},{"type":"Studio","relation":"oneOnly"}],"queries":{"getAll":"`query getAllMovies {moviesPagination(skip: 0, take: 100) {totalCount nodes {id,title,rating,actors(skip:0, take: 100){totalCount nodes {id}}studio{id}}}}`","getById":"`query movieGetDataById {movieGetDataById(movieId: \"id\",) {movie {id,title,rating{id}actors{id}studio{id}}}}`","create":"`mutation movieCreate {movieCreate(input: {id : entity.id title : entity.title rating : entity.rating actors : entity.actors studio : entity.studio }) {id,title,rating{id}actors{id}studio{id}}}}`","update":"`mutation movieUpdate {movieUpdate(movieId: \"entity.id\",input: {id : entity.id title : entity.title rating : entity.rating actors : entity.actors studio : entity.studio }) {id,title,rating{id}actors{id}studio{id}}}}`","delete":"`mutation {movieDelete (movieId:${id}) {movieId}}`"}},{"type":"ObjectTypeDefinition","typeName":"Actor","sqlTypeName":"actor","description":"","directives":[],"values":[],"fields":[{"name":"id","type":"ID","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int"},{"name":"name","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"movies","type":"Movie","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":true,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":true,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":false,"joinTable":{"state":true,"name":"Movie_Actor_actors","contains":[{"fieldName":"actor_id","type":"Actor","constraint":"FOREIGN KEY (\"actor_id\") REFERENCES \"actor\" (\"Pk_actor_id\")"},{"fieldName":"movie_id","type":"Movie","constraint":"FOREIGN KEY (\"movie_id\") REFERENCES \"movie\" (\"Pk_movie_id\")"}]},"oneToOneInfo":null,"sqlType":"int","relationType":"manyToMany"}],"implementedTypes":[],"relationList":[{"type":"Movie","relation":"manyToMany","relatedFieldName":"actors"}],"queries":{"getAll":"`query getAllActors {actorsPagination(skip: 0, take: 100) {totalCount nodes {id,name,movies(skip:0, take: 100){totalCount nodes {id}}}}}`","getById":"`query actorGetDataById {actorGetDataById(actorId: \"id\",) {actor {id,name,movies{id}}}}`","create":"`mutation actorCreate {actorCreate(input: {id : entity.id name : entity.name movies : entity.movies }) {id,name,movies{id}}}}`","update":"`mutation actorUpdate {actorUpdate(actorId: \"entity.id\",input: {id : entity.id name : entity.name movies : entity.movies }) {id,name,movies{id}}}}`","delete":"`mutation {actorDelete (actorId:${id}) {actorId}}`"}},{"type":"ObjectTypeDefinition","typeName":"Studio","sqlTypeName":"studio","description":"","directives":[],"values":[],"fields":[{"name":"name","type":"String","isEnum":false,"noNullArrayValues":false,"noNull":true,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"text"},{"name":"turnover","type":"Int","isEnum":false,"noNullArrayValues":false,"noNull":false,"isArray":false,"directives":[],"arguments":[],"isDeprecated":false,"foreign_key":null,"relation":false,"delegated_field":{"state":false,"side":null,"associatedWith":{"type":null,"fieldName":null}},"in_model":true,"joinTable":{"state":false,"name":null,"contains":[]},"oneToOneInfo":null,"sqlType":"int"}],"implementedTypes":[],"relationList":[],"queries":{"getAll":"`query getAllStudios {studiosPagination(skip: 0, take: 100) {totalCount nodes {name,turnover,}}}`","getById":"`query studioGetDataById {studioGetDataById(studioId: \"id\",) {studio {name,turnover{id}}}}`","create":"`mutation studioCreate {studioCreate(input: {name : entity.name turnover : entity.turnover }) {name,turnover{id}}}}`","update":"`mutation studioUpdate {studioUpdate(studioId: \"entity.id\",input: {name : entity.name turnover : entity.turnover }) {name,turnover{id}}}}`","delete":"`mutation {studioDelete (studioId:${id}) {studioId}}`"}}] ; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
    this.jsonGraphqlSchema = `type Movie {
  id: ID
  title: String 
  rating: Float 
  actors: [Actor]
  studio: Studio!
}

type Actor {
  id: ID
  name: String
  movies: [Movie]
}


type Studio {
  name: String!
  turnover: Int 
}

`; // GENERATED : PARSER RESULT FROM GAPHQL SCHEMA 
  }

  getSchemaTypes(){
    return this.types
  }

  getJsonGraphQlSchema(){
    return this.jsonGraphqlSchema
  }
}
