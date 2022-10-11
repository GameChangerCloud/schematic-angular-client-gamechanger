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
import { Employe } from '../models/employe';
import { environment } from 'src/environments/environment';
import { Update } from '@ngrx/entity';

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

  override add(entity: Employe): Observable<Employe> {
    let query = {
      // query: `
      //   mutation employeCreate($id:${entity.id},$email:"${entity.email}",$login:"${entity.login}",$password:"${entity.password}"){
      //     id,
      //     email,
      //     login,
      //     password
      //   }
      // `,
      query : `mutation {employeCreate(id :  "${entity.id}", email :  "${entity.email}", login :  "${entity.login}", password : "${entity.password}" ){ id,  email, login,  password }}`
    };

    let query2  = "mutation {employeCreate(id :  , email :  , firstName :  , lastName :  , login :  , password :  , workInfo :  , Fk_empl_employe_id :  , ){ id,  email,  firstName,  lastName,  login,  password,   workInfo{id},  Fk_empl_employe_id, }}"

    console.log(query);
    
    return this.http
    .post(environment.endpoint_uri, query)
    .pipe(map((result) => this.mapAdd(result)));
  }

  override getAll(): Observable<Employe[]> {
    let query = {
      query:
        `{employes {id,firstName,lastName,email,login,password,workInfo{id}}}`,
    };

    return this.http
      .post(environment.endpoint_uri, query)
      .pipe(map((result) => this.mapEmployes(result)));
  }

  override getById(id: string | number): Observable<Employe> {
    let query = {
      query: `{employe(id:${id}) {id,firstName,lastName,email,firstName,lastName,login,password,workInfo{work_id}}}`,
    };
    return this.http
      .post(environment.endpoint_uri, query)
      .pipe(map((result) => this.mapEmploye(result)));
  }

  override delete(key: string | number): Observable<string | number> {
    let query = {
      query: `mutation { employeDelete ( id:${key}){id,firstName,lastName,email,firstName,lastName,login,password}}`,
    };
    return this.http
      .post(environment.endpoint_uri, query)
      .pipe(map((result) => this.mapEmploye(result)));
  }

  override update(update: Update<Employe>): Observable<Employe> {
    let query = {
      query: `mutation { employeUpdate ( id:${update.id},firstName:${update.changes.firstName},lastName:${update.changes.lastName},email:${update.changes.email},login:${update.changes.login},password:${update.changes.password}){firstName}}`,
    };
    return this.http
      .post(environment.endpoint_uri, query)
      .pipe(map((result) => this.mapEmploye(result)));
  }

  mapEmployes(result: any) {
    console.log(result);
    
    return result.data.employes;
  }

  mapEmploye(result: any) {
    return result.data.employe;
  }

  mapUpdate(result: any) {

    return result.data.employe;
  }
  mapAdd(result: any) {
    console.log(result);
    
    return result.data;
  }
}
