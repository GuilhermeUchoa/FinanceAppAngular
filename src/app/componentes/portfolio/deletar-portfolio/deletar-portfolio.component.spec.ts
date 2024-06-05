import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarPortfolioComponent } from './deletar-portfolio.component';

describe('DeletarPortfolioComponent', () => {
  let component: DeletarPortfolioComponent;
  let fixture: ComponentFixture<DeletarPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletarPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
