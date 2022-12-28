import { Work } from '../models/work'
export class Employe { 
          public id!: number;
  public email!: String;
  public firstName?: String;
  public lastName?: String;
  public login!: String;
  public password!: String;
  public workInfo?: Work;
 
    }