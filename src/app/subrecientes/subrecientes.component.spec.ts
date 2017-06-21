import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubrecientesComponent } from './subrecientes.component';

describe('SubrecientesComponent', () => {
  let component: SubrecientesComponent;
  let fixture: ComponentFixture<SubrecientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubrecientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrecientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
