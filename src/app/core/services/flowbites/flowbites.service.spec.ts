import { TestBed } from '@angular/core/testing';

import { FlowbitesService } from './flowbites.service';

describe('FlowbitesService', () => {
  let service: FlowbitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowbitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
