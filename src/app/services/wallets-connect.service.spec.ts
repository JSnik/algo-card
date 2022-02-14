import { TestBed } from '@angular/core/testing';

import { WalletsConnectService } from './wallets-connect.service';

describe('WalletsConnectService', () => {
  let service: WalletsConnectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletsConnectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
