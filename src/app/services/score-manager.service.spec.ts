import { TestBed } from '@angular/core/testing';

import { ScoreManagerService } from './score-manager.service';

describe('ScoreManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScoreManagerService = TestBed.get(ScoreManagerService);
    expect(service).toBeTruthy();
  });
});
