import { IError } from './response-class';
import { IResObj } from './response-class';
import { IResObjList } from './response-class';

export type IResType = Promise<IError | IResObj<any> | IResObjList<any>>;
