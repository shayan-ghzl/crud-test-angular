import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AutoFocusDirective } from './auto-focus.directive';


@Component({
    template: `
    <div>
      <input type="text" appAutoFocus>
    </div>
    `,
})
class HostComponent {
}

/** Gets the currently-focused element while accounting for the shadow DOM. */
function getActiveElement() {
    const activeElement = document.activeElement as HTMLElement | null;
    return (activeElement?.shadowRoot?.activeElement as HTMLElement) || activeElement;
}

describe('FocusTrap', () => {
    let fixture: ComponentFixture<HostComponent>;
    let directive: AutoFocusDirective;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                HostComponent,
                AutoFocusDirective
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HostComponent);
        directive = fixture.debugElement.query(By.directive(AutoFocusDirective)).injector.get(AutoFocusDirective);
        spyOn(directive, 'ngAfterViewInit');
    });


    it('spy on input', () => {
        let inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
        // let inputElement = fixture.nativeElement.querySelector('input');
        const spy = spyOn(inputElement, 'focus');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

    it('spy on directive', () => {
        fixture.detectChanges();
        expect(directive.ngAfterViewInit).toHaveBeenCalled();
    });

    it('spy on directive second', () => {
        let debugElement = fixture.debugElement.query(By.css('input'));
        directive = debugElement.injector.get(AutoFocusDirective);
        const spy = spyOn(directive, 'ngAfterViewInit');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
    });

});