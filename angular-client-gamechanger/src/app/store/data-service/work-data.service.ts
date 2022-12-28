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
     import { Work } from '../models/work';
     
     @Injectable()
     export class WorkDataService extends DefaultDataService<Work> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger
       ) {
         super('Work', http, httpUrlGenerator);
         logger.log('Created custom Work EntityDataService');
       }
     
       override getAll(): Observable<Work[]> {
         let query = {
           query: `query getAllWorks {worksPagination(skip: 0, take: 100) {totalCount nodes {id,job,salary,empl{id}}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapWorks(result)));
       }

       override getById(id: string | number): Observable<Work> {
        let query = {
          query: `query workGetDataById {workGetDataById(workId: "id",) {work {id,job,salary,empl{id}}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapWork(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {workDelete (workId:${id}) {id,job,salary,empl{id}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapWork(result)));
      }
      override add(entity: Work): Observable<Work> {
        let query = {
            query: `mutation workCreate {workCreate(input: {id : entity.id job : entity.job salary : entity.salary empl : entity.empl }) {id,job,salary,empl{id}}}}`
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(entity: Update<Work>): Observable<Work> {
        let query = {
          query: `mutation workUpdate {workUpdate(workId: "entity.id",input: {id : entity.id job : entity.job salary : entity.salary empl : entity.empl }) {id,job,salary,empl{id}}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapWork(result)));
      }

     
       mapWorks(result: any) {
         return result.data.worksPagination.nodes;
       }
     
       mapWork(result: any) {
         return result.data.work;
       }
     
       mapUpdate(result: any) {
         return result.data.work;
       }
       mapAdd(result: any) {
         return result.data;
       }
     }