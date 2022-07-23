export class IError {
  status = 500;
  error = true;
  message = 'internal server errror';

  constructor(status: number = 500, message: string = '') {
    this.status = status;
    this.message = message;
  }
}

class IRes {
  status = 200;
  error = false;
  message = '';

  constructor(status: number, error: boolean, message: string = '') {
    this.status = status;
    this.error = error;
    this.message = message;
  }
}

export class IResObj<T> extends IRes {
  data: T;
  constructor(status: number, error: boolean, message: string = '', data: T) {
    super(status, error, message);
    this.data = data;
  }
}

export class IResObjList<T> extends IRes {
  data: T[];
  constructor(status: number, error: boolean, message: string = '', data: T[]) {
    super(status, error, message);
    this.data = data;
  }
}
