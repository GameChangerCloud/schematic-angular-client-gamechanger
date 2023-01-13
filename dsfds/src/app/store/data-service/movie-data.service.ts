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
     import { Movie } from '../models/movie';
     
     @Injectable()
     export class MovieDataService extends DefaultDataService<Movie> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger,
         gamechangerParserService: GamechangerParserService
       ) {
         super('Movie', http, httpUrlGenerator);
         logger.log('Created custom Movie EntityDataService');
         this.types = gamechangerParserService.getSchemaTypes()
       }
       types;
     
       override getAll(): Observable<Movie[]> {
         let query = {
           query: `query getAllMovies {moviesPagination(skip: 0, take: 100) {totalCount nodes {id,title,rating,actors(skip:0, take: 100){totalCount nodes {id}}studio{id}}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapMovies(result)));
       }

       override getById(id: string | number): Observable<Movie> {
        let query = {
          query: `query movieGetDataById {movieGetDataById(movieId: "id",) {movie {id,title,rating{id}actors{id}studio{id}}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapMovie(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {movieDelete (movieId: "${id}") {movieId}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapMovie(result)));
      }


      override add(entity: any): Observable<Movie> {
        let inputToCreate = ''
        for (const key  in entity) {
          if (Object.prototype.hasOwnProperty.call(entity, key)) {
            for (let i = 0; i < this.types.length; i++) {
              const type = this.types[i];
              if(type.typeName === 'Movie'&& entity[key]){
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
            query: `mutation movieCreate {movieCreate(input: {inputToCreate}) {movie{id,title,rating,actors(skip: 0, take: 100){totalCount nodes{id}} studio{id},}}}`
        };

        query.query = query.query.replace('inputToCreate',inputToCreate)
        
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }

      override update(entity: Update<Movie>): Observable<Movie> {
        let query = {
          query: `mutation movieUpdate {movieUpdate(movieId: "entity.id",input: {id : entity.id title : entity.title rating : entity.rating actors : entity.actors studio : entity.studio }) {id,title,rating{id} actors{id} studio{id} }}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapMovie(result)));
      }

     
       mapMovies(result: any) {
        let data;
        if(environment.api_auth_mechanism === "none"){
          data =  result.data.moviesPagination.nodes;
        } else if(environment.api_auth_mechanism === "cognito"){
          data = result.body.data.moviesPagination.nodes;
        } else {
          data = []
        }
         return data;
       }
     
       mapMovie(result: any) {
         return result.data.movie;
       }
     
       mapUpdate(result: any) {
         return result.data.movie;
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