import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggerinfoComponent } from './bloggerinfo.component';

describe('BloggerinfoComponent', () => {
  let component: BloggerinfoComponent;
  let fixture: ComponentFixture<BloggerinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloggerinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloggerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
