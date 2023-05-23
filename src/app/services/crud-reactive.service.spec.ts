import { TestBed } from '@angular/core/testing';

import { CrudReactiveService } from './crud-reactive.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('CrudReactiveService', () => {
  let service: CrudReactiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
      providers:[
        HttpClient
      ]
    });
    service = TestBed.inject(CrudReactiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
