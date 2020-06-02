import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerbooksComponent } from './sellerbooks.component';

describe('SellerbooksComponent', () => {
  let component: SellerbooksComponent;
  let fixture: ComponentFixture<SellerbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
