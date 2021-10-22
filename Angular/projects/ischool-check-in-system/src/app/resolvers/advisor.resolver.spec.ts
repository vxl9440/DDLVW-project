import { TestBed } from '@angular/core/testing';

import { AdvisorResolver } from './advisor.resolver';

describe('AdvisorResolver', () => {
  let resolver: AdvisorResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AdvisorResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
