import { User } from "./User";
import { Activity } from "./Activity";


export class Project {
  id              : string;
  name            : string;
  goal            : string;
  activity        : Activity;
  date            : Date;
  project_manager : User;
  teachers        : User[];
  canCopy         : boolean;
  status          : string;
}
