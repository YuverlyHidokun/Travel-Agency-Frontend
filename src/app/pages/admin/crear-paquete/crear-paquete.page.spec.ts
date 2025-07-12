import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearPaquetePage } from './crear-paquete.page';

describe('CrearPaquetePage', () => {
  let component: CrearPaquetePage;
  let fixture: ComponentFixture<CrearPaquetePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPaquetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
