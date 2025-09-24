import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProviderDialog } from './create-provider-dialog';

describe('CreateProviderDialog', () => {
  let component: CreateProviderDialog;
  let fixture: ComponentFixture<CreateProviderDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProviderDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProviderDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
