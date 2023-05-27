interface IBaseEntity{
      id:number;
}
export interface IBaseCustomer {
      firstname:string;
      lastname:string;
      dateOfBirth:string;
      phoneNumber:string;
      email:string;
      bankAccountNumber:string;
}
export interface ICustomer extends IBaseCustomer, IBaseEntity{ }