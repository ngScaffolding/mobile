import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogonPage } from './logon.page';

describe('LogonPage', () => {
  let component: LogonPage;
  let fixture: ComponentFixture<LogonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
