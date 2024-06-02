import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasDespesasComponent } from './receitas-despesas.component';

describe('ReceitasDespesasComponent', () => {
  let component: ReceitasDespesasComponent;
  let fixture: ComponentFixture<ReceitasDespesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceitasDespesasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceitasDespesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
