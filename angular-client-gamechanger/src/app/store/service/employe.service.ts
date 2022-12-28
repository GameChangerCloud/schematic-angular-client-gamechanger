import { Injectable } from '@angular/core';
    import {
      EntityCollectionServiceBase,
      EntityCollectionServiceElementsFactory
    } from '@ngrx/data';
    import { Employe } from '../models/employe';
     
    @Injectable({ providedIn: 'root' })
    export class EmployeService extends EntityCollectionServiceBase<Employe> {
      constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
        super('Employe', serviceElementsFactory);
      }
    }