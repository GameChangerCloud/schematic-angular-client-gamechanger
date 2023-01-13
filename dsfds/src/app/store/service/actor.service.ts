import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { Actor } from '../models/actor';
     
    @Injectable({ providedIn: 'root' })
    export class ActorService extends EntityCollectionServiceBase<Actor> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Actor', serviceElementsFactory);
      }
    }