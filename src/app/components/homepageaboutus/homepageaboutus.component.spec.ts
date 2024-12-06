import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageaboutusComponent } from './homepageaboutus.component';

describe('HomepageaboutusComponent', () => {
  let component: HomepageaboutusComponent;
  let fixture: ComponentFixture<HomepageaboutusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepageaboutusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomepageaboutusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
