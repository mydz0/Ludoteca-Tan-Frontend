import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogErrorDuplicateNameComponent } from './dialog-error-duplicate-name';

describe('DialogError', () => {
  let component: DialogErrorDuplicateNameComponent;
  let fixture: ComponentFixture<DialogErrorDuplicateNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogErrorDuplicateNameComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogErrorDuplicateNameComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
