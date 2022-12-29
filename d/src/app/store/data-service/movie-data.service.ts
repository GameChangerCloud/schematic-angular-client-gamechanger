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
     import { Movie } from '../models/movie';
     
     @Injectable()
     export class MovieDataService extends DefaultDataService<Movie> {
       constructor(
         http: HttpClient,
         httpUrlGenerator: HttpUrlGenerator,
         logger: Logger
       ) {
         super('Movie', http, httpUrlGenerator);
         logger.log('Created custom Movie EntityDataService');
       }
     
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
          query: `mutation {movieDelete (movieId:${id}) {movieId}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapMovie(result)));
      }
      override add(entity: Movie): Observable<Movie> {
        let query = {
            query: `mutation movieCreate {movieCreate(input: {id : entity.id title : entity.title rating : entity.rating actors : entity.actors studio : entity.studio }) {id,title,rating{id}actors{id}studio{id}}}}`
        };
            
        return this.http
        .post(environment.endpoint_uri, query)
        .pipe(map((result) => this.mapAdd(result)));
      }
      override update(entity: Update<Movie>): Observable<Movie> {
        let query = {
          query: `mutation movieUpdate {movieUpdate(movieId: "entity.id",input: {id : entity.id title : entity.title rating : entity.rating actors : entity.actors studio : entity.studio }) {id,title,rating{id}actors{id}studio{id}}}}`
        };
        return this.http
          .post(environment.endpoint_uri, query)
          .pipe(map((result) => this.mapMovie(result)));
      }

     
       mapMovies(result: any) {
         return result.data.moviesPagination.nodes;
       }
     
       mapMovie(result: any) {
         return result.data.movie;
       }
     
       mapUpdate(result: any) {
         return result.data.movie;
       }
       mapAdd(result: any) {
         return result.data;
       }
     }