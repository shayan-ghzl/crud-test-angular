import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneNumberUtil = PhoneNumberUtil.getInstance();

// export function PhoneNumberValidator(regionCode: string): ValidatorFn {
//   return (control: AbstractControl) => {
//     let validNumber = false;
//     try {
//       const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
//         control.value, regionCode
//       );
//       validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
//     } catch (e) { }
//     return validNumber ? null : { 'wrongNumber': { value: control.value } };
//   }
// }

export function PhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    let validNumber = false;
    try {
      const parsedNumber = phoneNumberUtil.parse(control.value);
      validNumber = phoneNumberUtil.isValidNumber(parsedNumber);
    } catch (e) { }
    return validNumber ? null : { 'wrongNumber': { value: control.value } };
  };
}