import { TestBed } from '@angular/core/testing';

import { GamechangerParserService } from './gamechanger-parser.service';

describe('GamechangerParserService', () => {
  let service: GamechangerParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamechangerParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
