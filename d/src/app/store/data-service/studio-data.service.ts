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
     import { Studio } from '../models/studio';
     
     @Injectable()
     export class StudioDataService extends DefaultDataService<Studio> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger
       ) {
         super('Studio', http, httpUrlGenerator);
         logger.log('Created custom Studio EntityDataService');
       }
     
       override getAll(): Observable<Studio[]> {
         let query = {
           query: `query getAllStudios {studiosPagination(skip: 0, take: 100) {totalCount nodes {name,turnover,}}}`
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
          query: `mutation {studioDelete (studioId:${id}) {studioId}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapStudio(result)));
      }
      override add(entity: Studio): Observable<Studio> {
        let query = {
            query: `mutation studioCreate {studioCreate(input: {name : entity.name turnover : entity.turnover }) {name,turnover{id}}}}`
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(entity: Update<Studio>): Observable<Studio> {
        let query = {
          query: `mutation studioUpdate {studioUpdate(studioId: "entity.id",input: {name : entity.name turnover : entity.turnover }) {name,turnover{id}}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapStudio(result)));
      }

     
       mapStudios(result: any) {
         return result.data.studiosPagination.nodes;
       }
     
       mapStudio(result: any) {
         return result.data.studio;
       }
     
       mapUpdate(result: any) {
         return result.data.studio;
       }
       mapAdd(result: any) {
         return result.data;
       }
     }