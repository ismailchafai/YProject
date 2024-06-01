import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacteurApparetementComponent } from './facteur-apparetement.component';

describe('FacteurApparetementComponent', () => {
  let component: FacteurApparetementComponent;
  let fixture: ComponentFixture<FacteurApparetementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacteurApparetementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacteurApparetementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
