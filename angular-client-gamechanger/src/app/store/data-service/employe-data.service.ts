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
           query: `query getAllEmployes {employesPagination(skip: 0, take: 100) {totalCount nodes {id,email,firstName,lastName,login,password,workInfo{id}}}}`
         };
     
         return this.http
           .post(environment.endpoint_uri, query)
           .pipe(map((result) => this.mapEmployes(result)));
       }

       override getById(id: string | number): Observable<Employe> {
        let query = {
          query: `query employeGetDataById {employeGetDataById(employeId: "id",) {employe {id,email,firstName,lastName,login,password,workInfo{id}}}}`
        };

        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }


      override delete(id: string | number): Observable<string | number> {
        let query = {
          query: `mutation {employeDelete (employeId:${id}) {id,email,firstName,lastName,login,password,workInfo{id}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }
      override add(entity: Employe): Observable<Employe> {
        let query = {
            query: `mutation employeCreate {employeCreate(input: {id : entity.id email : entity.email firstName : entity.firstName lastName : entity.lastName login : entity.login password : entity.password workInfo : entity.workInfo }) {id,email,firstName,lastName,login,password,workInfo{id}}}}`
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(entity: Update<Employe>): Observable<Employe> {
        let query = {
          query: `mutation employeUpdate {employeUpdate(employeId: "entity.id",input: {id : entity.id email : entity.email firstName : entity.firstName lastName : entity.lastName login : entity.login password : entity.password workInfo : entity.workInfo }) {id,email,firstName,lastName,login,password,workInfo{id}}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapEmploye(result)));
      }

     
       mapEmployes(result: any) {
         return result.data.employesPagination.nodes;
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