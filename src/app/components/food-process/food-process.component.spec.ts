import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodProcessComponent } from './food-process.component';

describe('FoodProcessComponent', () => {
  let component: FoodProcessComponent;
  let fixture: ComponentFixture<FoodProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
