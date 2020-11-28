import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenaObjectComponent } from './scena-object.component';

describe('ScenaObjectComponent', () => {
  let component: ScenaObjectComponent;
  let fixture: ComponentFixture<ScenaObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenaObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenaObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
