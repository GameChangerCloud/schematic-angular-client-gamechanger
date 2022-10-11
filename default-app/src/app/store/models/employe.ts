import {Work} from '../models/work'

export class Employe {
    public id!: Number;
    public email?: String;
    public firstName?: string;
    public lastName?: string;
    public login?: string;
    public password?: string;
    public workInfo?: Work;
}