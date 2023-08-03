import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFocusDirective } from './auto-focus.directive';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerDialogComponent } from 'src/app/customer-dialog/customer-dialog.component';
import { By } from '@angular/platform-browser';

fdescribe('AutoFocusDirective', () => {
  let fixture: ComponentFixture<any>;
  let element: DebugElement;
  let directive: AutoFocusDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoFocusDirective, CustomerDialogComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CustomerDialogComponent);
    element = fixture.debugElement.query(By.css('[appAutoFocus]'));
    directive = element.injector.get(AutoFocusDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should focus on the element after view initialization', () => {
    fixture.detectChanges();
    expect(document.activeElement).toBe(element.nativeNode);
  });

  it('ngAfterViewInit should have been called', () => {
    const spy = spyOn(directive, 'ngAfterViewInit').and.callFake(() => {
      console.log('whatever you say officer');
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
