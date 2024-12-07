import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCtaComponent } from './estado-cta.component';

describe('EstadoCtaComponent', () => {
  let component: EstadoCtaComponent;
  let fixture: ComponentFixture<EstadoCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoCtaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
