import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbersCountComponent } from './numbers-count.component';

describe('NumbersCountComponent', () => {
  let component: NumbersCountComponent;
  let fixture: ComponentFixture<NumbersCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumbersCountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumbersCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
