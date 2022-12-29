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
     import { Actor } from '../models/actor';
     
     @Injectable()
     export class ActorDataService extends DefaultDataService<Actor> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger
       ) {
         super('Actor', http, httpUrlGenerator);
         logger.log('Created custom Actor EntityDataService');
       }
     
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
          query: `mutation {actorDelete (actorId:${id}) {actorId}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapActor(result)));
      }
      override add(entity: Actor): Observable<Actor> {
        let query = {
            query: `mutation actorCreate {actorCreate(input: {id : entity.id name : entity.name movies : entity.movies }) {id,name,movies{id}}}}`
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(entity: Update<Actor>): Observable<Actor> {
        let query = {
          query: `mutation actorUpdate {actorUpdate(actorId: "entity.id",input: {id : entity.id name : entity.name movies : entity.movies }) {id,name,movies{id}}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapActor(result)));
      }

     
       mapActors(result: any) {
         return result.data.actorsPagination.nodes;
       }
     
       mapActor(result: any) {
         return result.data.actor;
       }
     
       mapUpdate(result: any) {
         return result.data.actor;
       }
       mapAdd(result: any) {
         return result.data;
       }
     }