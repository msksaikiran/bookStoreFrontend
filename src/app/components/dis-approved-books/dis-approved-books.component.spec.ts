import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisApprovedBooksComponent } from './dis-approved-books.component';

describe('DisApprovedBooksComponent', () => {
  let component: DisApprovedBooksComponent;
  let fixture: ComponentFixture<DisApprovedBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisApprovedBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisApprovedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
