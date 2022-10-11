import { TestBed } from '@angular/core/testing';

import { SchemaTypesService } from './schema-types.service';

describe('SchemaTypesService', () => {
  let service: SchemaTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
