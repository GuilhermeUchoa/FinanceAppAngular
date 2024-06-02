import { TestBed } from '@angular/core/testing';

import { ReceitasDespesasService } from './receitas-despesas.service';

describe('ReceitasDespesasService', () => {
  let service: ReceitasDespesasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceitasDespesasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
