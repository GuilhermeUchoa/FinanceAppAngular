import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioDetalheComponent } from './portfolio-detalhe.component';

describe('PortfolioDetalheComponent', () => {
  let component: PortfolioDetalheComponent;
  let fixture: ComponentFixture<PortfolioDetalheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioDetalheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PortfolioDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
