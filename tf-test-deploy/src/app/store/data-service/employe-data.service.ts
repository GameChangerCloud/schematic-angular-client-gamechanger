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
     import { Employe } from '../models/employe';
     
     @Injectable()
     export class EmployeDataService extends DefaultDataService<Employe> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger
       ) {
         super('Employe', http, httpUrlGenerator);
         logger.log('Created custom Employe EntityDataService');
       }
     
       override getAll(): Observable<Employe[]> {
         let query = {
           query: `{employes {id,email,firstName,lastName,login,password,workInfo{id}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapEmployes(result)));
       }

       override getById(id: string | number): Observable<Employe> {
        let query = {
          query: `{employe(id:${id}) {id,email,firstName,lastName,login,password,workInfo{id}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {employeDelete (id:${id}) {id,email,firstName,lastName,login,password,workInfo{id}}}`
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

     
       mapEmployes(result: any) {
         return result.data.employes;
       }
     
       mapEmploye(result: any) {
         return result.data.employe;
       }
     
       mapUpdate(result: any) {
         return result.data.employe;
       }
       mapAdd(result: any) {
         return result.data;
       }
     }