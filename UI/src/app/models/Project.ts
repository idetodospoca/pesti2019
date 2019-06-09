import { User } from "./User";
import { Activity } from "./Activity";
import { Technique } from "./Technique";


export class Project {
  _id             : string;
  name            : string;
  goal            : string;
  activity        : Activity;
  date            : Date;
  project_manager : User;
  teachers        : User[];
  canCopy         : boolean;
  status          : string;
  techniques      : Technique[];
}
