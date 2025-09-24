import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServicesDialog } from './create-services-dialog';

describe('CreateServicesDialog', () => {
  let component: CreateServicesDialog;
  let fixture: ComponentFixture<CreateServicesDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateServicesDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateServicesDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
