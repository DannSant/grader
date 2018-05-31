import {Question} from './question.class';
export class Exam {
  id:number;
  name:string;
  desc:string;
  author: string;
  viewer: string;
  questions:Question[]=[];
  shuffle:boolean;
  url:string;
  constructor(name,desc,author,viewer,shuffle){
    this.name=name;
    this.desc=desc;
    this.author=author;
    this.viewer=viewer;
    this.shuffle=shuffle;
  }
}
