import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { Studio } from '../models/studio';
     
    @Injectable({ providedIn: 'root' })
    export class StudioService extends EntityCollectionServiceBase<Studio> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Studio', serviceElementsFactory);
      }
    }