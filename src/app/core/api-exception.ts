export class ApiException<T = any> {
  returnCode: number;
  errorData: T;

  constructor(returnCode: number, errorData: T) {
    this.returnCode = returnCode;
    this.errorData = errorData;
  }
}
