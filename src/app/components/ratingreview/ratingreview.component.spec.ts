import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingreviewComponent } from './ratingreview.component';

describe('RatingreviewComponent', () => {
  let component: RatingreviewComponent;
  let fixture: ComponentFixture<RatingreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatingreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
