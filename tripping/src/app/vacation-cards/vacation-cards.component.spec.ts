import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationCardsComponent } from './vacation-cards.component';

describe('VacationCardsComponent', () => {
  let component: VacationCardsComponent;
  let fixture: ComponentFixture<VacationCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacationCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VacationCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
