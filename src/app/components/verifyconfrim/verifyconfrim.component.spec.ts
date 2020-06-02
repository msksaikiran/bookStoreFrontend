import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyconfrimComponent } from './verifyconfrim.component';

describe('VerifyconfrimComponent', () => {
  let component: VerifyconfrimComponent;
  let fixture: ComponentFixture<VerifyconfrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyconfrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyconfrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
