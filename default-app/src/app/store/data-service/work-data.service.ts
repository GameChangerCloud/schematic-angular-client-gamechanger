import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  EntityCollectionDataService,
  DefaultDataService,
  HttpUrlGenerator,
  Logger,
  QueryParams
} from '@ngrx/data';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Work } from '../models/work';
import { environment } from 'src/environments/environment';
import { Update } from '@ngrx/entity';


@Injectable()
export class WorkDataService extends DefaultDataService<Work> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, logger: Logger) {
    super('Work', http, httpUrlGenerator);
    logger.log('Created custom Work EntityDataService');
  }

  override getAll(): Observable<Work[]> {

    let query = {
      'query':'{works {id,job,salary,empl{id}}}'
    }

    return  this.http.post(environment.endpoint_uri,query).pipe(map(result => this.mapWorks(result)))
  }

  // override add(entity: Work): Observable<Work> {
  //   // let query = {
  //   //   // query: `
  //   //   //   mutation employeCreate($id:${entity.id},$email:"${entity.email}",$login:"${entity.login}",$password:"${entity.password}"){
  //   //   //     id,
  //   //   //     email,
  //   //   //     login,
  //   //   //     password
  //   //   //   }
  //   //   // `,
  //   //   query : `mutation {workCreate(id :  "${entity.id}", email :  "${entity.email}", login :  "${entity.login}", password : "${entity.password}" ){ id,  email, login,  password }}`
  //   // };

  //   let query2  = "mutation workCreate(id :  , email :  , firstName :  , lastName :  , login :  , password :  , workInfo :  , Fk_empl_employe_id :  , ){ id,  email,  firstName,  lastName,  login,  password,   workInfo{id},  Fk_empl_employe_id, }}"

  //   console.log(query);
    
  //   return this.http
  //   .post(environment.endpoint_uri, query)
  //   .pipe(map((result) => this.mapAdd(result)));
  // }


  // override getById(id: string | number): Observable<Work> {
  //   let query = {
  //   'query':`{work(id:${id}) {id,firstName,lastName,email,firstName,lastName,login,password}}`
  //   }
  //   return  this.http.post(environment.endpoint_uri,query).pipe(map(result => this.mapWork(result)))
  // }

  override delete(key: string | number): Observable<string | number> {
    let query = {'query':`mutation { workDelete ( id:${key}){id,job,salary}}`}
    return  this.http.post(environment.endpoint_uri,query).pipe(map(result => this.mapWork(result)))
  }

  // override update(update: Update<Work>): Observable<Work> {
  //   let query = {'query':`mutation { workUpdate ( id:${update.id},firstName:${update.changes.firstName},lastName:${update.changes.lastName},email:${update.changes.email},login:${update.changes.login},password:${update.changes.password}){firstName}}`}    
  //   return  this.http.post(environment.endpoint_uri,query).pipe(map(result => this.mapWork(result)))
  // }


  mapWorks(result: any) {
    return result.data.works
  }

  mapWork(result: any) {           
    return result.data.work
  }

  mapUpdate(result: any) {    
    console.log('UPDATE ==>',result);
    return result.data.work
  }
}