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
           query: `{works {id,job,salary,empl{id}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapWorks(result)));
       }

       override getById(id: string | number): Observable<Employe> {
        let query = {
          query: `{work(id:${id}) {id,job,salary,empl{id}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {workDelete (id:${id}) {id,job,salary,empl{id}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }
      override add(entity: Employe): Observable<Employe> {
        let query = {
            query: 'TOFIX'
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(update: Update<Employe>): Observable<Employe> {
        let query = {
          query: 'TOFIX'
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }

     
       mapWorks(result: any) {
         return result.data.works;
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