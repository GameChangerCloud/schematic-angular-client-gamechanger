import { Injectable } from '@angular/core';
     import { HttpClient } from '@angular/common/http';
     import {
       EntityCollectionDataService,
       DefaultDataService,
       HttpUrlGenerator,
       Logger,
       QueryParams,
     } from '@ngrx/data';
     import { Observable } from 'rxjs';
     import { map } from 'rxjs/operators';
     import { environment } from 'src/environments/environment';
     import { Update } from '@ngrx/entity';
     import { GamechangerParserService } from 'src/app/module/gamechanger-admin/services/gamechanger-parser.service';
     import { Actor } from '../models/actor';
     
     @Injectable()
     export class ActorDataService extends DefaultDataService<Actor> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger,
         gamechangerParserService: GamechangerParserService
       ) {
         super('Actor', http, httpUrlGenerator);
         logger.log('Created custom Actor EntityDataService');
         this.types = gamechangerParserService.getSchemaTypes()
       }
       types;
     
       override getAll(): Observable<Actor[]> {
         let query = {
           query: `query getAllActors {actorsPagination(skip: 0, take: 100) {totalCount nodes {id,name,movies(skip:0, take: 100){totalCount nodes {id}}}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapActors(result)));
       }

       override getById(id: string | number): Observable<Actor> {
        let query = {
          query: `query actorGetDataById {actorGetDataById(actorId: "id",) {actor {id,name,movies{id}}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapActor(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {actorDelete (actorId: "${id}") {actorId}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapActor(result)));
      }


      override add(entity: any): Observable<Actor> {
        let inputToCreate = ''
        for (const key  in entity) {
          if (Object.prototype.hasOwnProperty.call(entity, key)) {
            for (let i = 0; i < this.types.length; i++) {
              const type = this.types[i];
              if(type.typeName === 'Actor'&& entity[key]){
                for (let i = 0; i < type.fields.length; i++) {
                  const field = type.fields[i];
                  if(field.name === key){
                    if(field.relation){
                      let str = field.name
                      if(field.isArray){
                        inputToCreate += `${str.substring(0, str.length - 1)}Ids : ${entity[key]} `
                      } else {
                        inputToCreate += `${field.name}Id : ${entity[key]} `
                      }
                    } else {
                      inputToCreate += `${key}:${this.toStringField(entity[key],field.type)} `
                    }
                  } 
                }
              }
            }

          }
        }

        let query = {
            query: `mutation actorCreate {actorCreate(input: {inputToCreate}) {actor{id,name,movies(skip: 0, take: 100){totalCount nodes{id}} }}}`
        };

        query.query = query.query.replace('inputToCreate',inputToCreate)
        
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }

      override update(entity: Update<Actor>): Observable<Actor> {
        let query = {
          query: `mutation actorUpdate {actorUpdate(actorId: "entity.id",input: {id : entity.id name : entity.name movies : entity.movies }) {id,name,movies{id} }}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapActor(result)));
      }

     
       mapActors(result: any) {
        let data;
        if(environment.api_auth_mechanism === "none"){
          data =  result.data.actorsPagination.nodes;
        } else if(environment.api_auth_mechanism === "cognito"){
          data = result.body.data.actorsPagination.nodes;
        } else {
          data = []
        }
         return data;
       }
     
       mapActor(result: any) {
         return result.data.actor;
       }
     
       mapUpdate(result: any) {
         return result.data.actor;
       }
       mapAdd(result: any) {
        
        let data;
          if(environment.api_auth_mechanism === "none"){
            data =  result.data.studioCreate.studio;
          } else if(environment.api_auth_mechanism === "cognito"){          
            data = result.body.data.studioCreate.studio;
          } else {
            data = []
          }
         return data;
       }

      toStringField(field: string,entityType:string){

        let fieldValue = field;
        if(entityType === 'String' || entityType === 'ID' ){
          // fieldValue.replace(/"([^"]*)"/g, '[$1]')
          // console.log(fieldValue.replace(/"([^"]*)"/g, '[$1]'));
          fieldValue = '"' + field + '"'
          // fieldValue = fieldValue.replace(/"([^"]*)"/g, '$1');
        } else {}
        return fieldValue;
      }
     }