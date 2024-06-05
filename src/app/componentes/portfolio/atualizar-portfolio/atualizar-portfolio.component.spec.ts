import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarPortfolioComponent } from './atualizar-portfolio.component';

describe('AtualizarPortfolioComponent', () => {
  let component: AtualizarPortfolioComponent;
  let fixture: ComponentFixture<AtualizarPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtualizarPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
