import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PraxisProfesorComponent } from './praxis-profesor.component';

describe('PraxisProfesorComponent', () => {
  let component: PraxisProfesorComponent;
  let fixture: ComponentFixture<PraxisProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PraxisProfesorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PraxisProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
