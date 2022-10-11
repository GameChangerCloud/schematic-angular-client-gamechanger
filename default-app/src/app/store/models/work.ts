import {Employe} from '../models/employe'

export class Work {
  public id!: Number;
  public job?: String;
  public salary?: string;
  public empl?: [Employe];
}