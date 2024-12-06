import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentpostComponent } from './recentpost.component';

describe('RecentpostComponent', () => {
  let component: RecentpostComponent;
  let fixture: ComponentFixture<RecentpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentpostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
