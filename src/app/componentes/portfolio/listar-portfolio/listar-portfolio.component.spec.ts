import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPortfolioComponent } from './listar-portfolio.component';

describe('ListarPortfolioComponent', () => {
  let component: ListarPortfolioComponent;
  let fixture: ComponentFixture<ListarPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
