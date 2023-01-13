import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { Movie } from '../models/movie';
     
    @Injectable({ providedIn: 'root' })
    export class MovieService extends EntityCollectionServiceBase<Movie> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Movie', serviceElementsFactory);
      }
    }