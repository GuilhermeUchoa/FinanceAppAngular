import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarPortfolioComponent } from './criar-portfolio.component';

describe('CriarPortfolioComponent', () => {
  let component: CriarPortfolioComponent;
  let fixture: ComponentFixture<CriarPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarPortfolioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriarPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
