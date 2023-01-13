import { Actor } from './actor'
import { Studio } from './studio'

export class Movie { 
          public id!: number;
  public title?: String;
  public rating?: number;
  public actors?: [Actor];
  public studio!: Studio;
 
    }