import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoDetalheComponent } from './ativo-detalhe.component';

describe('AtivoDetalheComponent', () => {
  let component: AtivoDetalheComponent;
  let fixture: ComponentFixture<AtivoDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtivoDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtivoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
