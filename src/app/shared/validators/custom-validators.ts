import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PhoneNumberUtil } from "google-libphonenumber";

const phoneNumberUtil = PhoneNumberUtil.getInstance();

export function PhoneNumberValidator(regionCode: string): ValidatorFn {
  return (control: AbstractControl) => {
    let validNumber = false;
    try {
      const phoneNumber = phoneNumberUtil.parseAndKeepRawInput(
        control.value, regionCode
      );
      validNumber = phoneNumberUtil.isValidNumber(phoneNumber);
    } catch (e) { }
    return validNumber ? null : { 'wrongNumber': { value: control.value } };
  }
}


// function phoneNumberValidator(regionCode: string): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const phoneNumberUtil = PhoneNumberUtil.getInstance();
//     const phoneNumber = control.value;

//     try {
//       const parsedPhoneNumber = phoneNumberUtil.parse(phoneNumber, regionCode); // Replace 'US' with the desired country code
//       const isValid = phoneNumberUtil.isValidNumber(parsedPhoneNumber);

//       return isValid ? null : { invalidPhoneNumber: true };
//     } catch (error) {
//       return { invalidPhoneNumber: true };
//     }
//   };
// }