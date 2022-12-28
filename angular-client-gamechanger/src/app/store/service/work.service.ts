import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { Work } from '../models/work';
     
    @Injectable({ providedIn: 'root' })
    export class WorkService extends EntityCollectionServiceBase<Work> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Work', serviceElementsFactory);
      }
    }