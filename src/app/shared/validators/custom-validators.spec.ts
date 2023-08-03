import { FormControl } from '@angular/forms';
import { PhoneNumberValidator } from './custom-validators';

describe('PhoneNumberValidator', () => {

  it('should return null if the control value is valid', () => {
    const control = new FormControl('+989353728642');
    //  const validatorFn = PhoneNumberValidator('IR');
    const validatorFn = PhoneNumberValidator();
    const result = validatorFn(control);
    expect(result).toBeNull();
  });

  it('should return an error object if the control value is invalid', () => {
    const control = new FormControl('+999353728642');
    //  const validatorFn = PhoneNumberValidator('IR');
    const validatorFn = PhoneNumberValidator();
    const result = validatorFn(control);
    expect(result).toEqual({ 'wrongNumber': { value: control.value } });
  });

});
