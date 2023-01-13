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
     import { Studio } from '../models/studio';
     
     @Injectable()
     export class StudioDataService extends DefaultDataService<Studio> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger,
         gamechangerParserService: GamechangerParserService
       ) {
         super('Studio', http, httpUrlGenerator);
         logger.log('Created custom Studio EntityDataService');
         this.types = gamechangerParserService.getSchemaTypes()
       }
       types;
     
       override getAll(): Observable<Studio[]> {
         let query = {
           query: `query getAllStudios {studiosPagination(skip: 0, take: 100) {totalCount nodes {id,name,turnover,}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapStudios(result)));
       }

       override getById(id: string | number): Observable<Studio> {
        let query = {
          query: `query studioGetDataById {studioGetDataById(studioId: "id",) {studio {name,turnover{id}}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapStudio(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {studioDelete (studioId: "${id}") {studioId}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapStudio(result)));
      }


      override add(entity: any): Observable<Studio> {
        let inputToCreate = ''
        for (const key  in entity) {
          if (Object.prototype.hasOwnProperty.call(entity, key)) {
            for (let i = 0; i < this.types.length; i++) {
              const type = this.types[i];
              if(type.typeName === 'Studio'&& entity[key]){
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
            query: `mutation studioCreate {studioCreate(input: {inputToCreate}) {studio{id,name,turnover,}}}`
        };

        query.query = query.query.replace('inputToCreate',inputToCreate)
        
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }

      override update(entity: Update<Studio>): Observable<Studio> {
        let query = {
          query: `mutation studioUpdate {studioUpdate(studioId: "entity.id",input: {name : entity.name turnover : entity.turnover }) {name,turnover{id} }}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapStudio(result)));
      }

     
       mapStudios(result: any) {
        let data;
        if(environment.api_auth_mechanism === "none"){
          data =  result.data.studiosPagination.nodes;
        } else if(environment.api_auth_mechanism === "cognito"){
          data = result.body.data.studiosPagination.nodes;
        } else {
          data = []
        }
         return data;
       }
     
       mapStudio(result: any) {
         return result.data.studio;
       }
     
       mapUpdate(result: any) {
         return result.data.studio;
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