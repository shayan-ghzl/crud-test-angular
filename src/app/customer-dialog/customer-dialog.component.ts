import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, of, startWith } from 'rxjs';
import { IBaseCustomer, ICustomer } from '../shared/models/customer';
import { StorageService, StorageStatus } from '../shared/services/storage.service';
import { PhoneNumberValidator } from '../shared/validators/custom-validators';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerDialogComponent implements OnInit, AfterViewInit {

  @Output() dialogClosed = new EventEmitter<ICustomer | null>();
  @Input() customer: ICustomer | null = null;
  // @ViewChild('firstnameInput') firstnameInput!:ElementRef<HTMLInputElement>;

  customerForm = new FormGroup({
    firstname: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9\u0627-\u06cc]{3,32}$/i)]),
    lastname: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9\u0627-\u06cc]{3,32}$/i)]),
    dateOfBirth: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[1-4]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/)]),
    // phoneNumber:new FormControl({ value: '', disabled: false }, [PhoneNumberValidator('IR')]),
    phoneNumber: new FormControl({ value: '', disabled: false }, [PhoneNumberValidator()]),
    email: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)]),
    bankAccountNumber: new FormControl({ value: '', disabled: false }, [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)]),
  });

  constructor(
    private storageService: StorageService
  ) {
  }

  ngAfterViewInit(): void {
    // this.firstnameInput.nativeElement.focus();  
  }

  formgropChanged$ = of(false);
  ngOnInit() {
    if (this.customer) {
      const formInit = {
        firstname: this.customer.firstname,
        lastname: this.customer.lastname,
        dateOfBirth: this.customer.dateOfBirth,
        phoneNumber: this.customer.phoneNumber,
        email: this.customer.email,
        bankAccountNumber: this.customer.bankAccountNumber,
      };
      this.customerForm.setValue(formInit);
      this.formgropChanged$ = this.customerForm.valueChanges.pipe(
        startWith(formInit),
        map((value) => (JSON.stringify(value) == JSON.stringify(formInit)) ? true : false),
      );
    }
  }

  @HostListener('document:keyup.escape')
  closeDialog() {
    this.dialogClosed.emit(this.customer);
    this.customerForm.reset();
    this.customer = null;
  }

  @HostListener('document:keyup.enter')
  submit() {
    if (this.customerForm.invalid) {
      return;
    }
    const trimedValue: IBaseCustomer = {
      firstname: this.customerForm.value.firstname.trim(),
      lastname: this.customerForm.value.lastname.trim(),
      dateOfBirth: this.customerForm.value.dateOfBirth.trim(),
      phoneNumber: this.customerForm.value.phoneNumber.trim(),
      email: this.customerForm.value.email.trim(),
      bankAccountNumber: this.customerForm.value.bankAccountNumber.trim(),
    };

    let status = StorageStatus.SUCCESS;
    if (this.customer) {
      status = this.storageService.editItem({ ...trimedValue, id: this.customer.id });
    } else {
      status = this.storageService.addItem(trimedValue);
    }
    switch (status) {
      case StorageStatus.PERSONEXISTS:
        this.customerForm.controls['firstname'].setErrors({ 'incorrect': true });
        break;

      case StorageStatus.EMAILEXISTS:
        this.customerForm.controls['email'].setErrors({ 'incorrect': true });
        break;

      default:
        this.closeDialog();
        break;
    }

  }

}
