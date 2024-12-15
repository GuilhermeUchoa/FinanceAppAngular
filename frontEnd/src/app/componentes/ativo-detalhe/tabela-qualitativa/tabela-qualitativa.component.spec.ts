import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaQualitativaComponent } from './tabela-qualitativa.component';

describe('TabelaQualitativaComponent', () => {
  let component: TabelaQualitativaComponent;
  let fixture: ComponentFixture<TabelaQualitativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaQualitativaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabelaQualitativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
