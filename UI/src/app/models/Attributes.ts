import { User } from "./User"

export class Behaviour {
  category  : string;
  verb      : string;
}

export class AffectiveObjective {
  category  : string;
  verb      : string;
}

export class TaskType {
  category  : string;
  verb      : string;
}

export class Attributes {
  delivery_mode         : string[];
  interaction           : string[];
  resolution_scope      : string[];
  behaviour             : Behaviour[];
  affective_objectives  : AffectiveObjective[];
  social_objectives     : string[];
  task_types            : TaskType[];
  psychologist          : User;
}
