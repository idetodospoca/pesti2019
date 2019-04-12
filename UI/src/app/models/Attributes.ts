import { User } from "./User"


export class DeliveryMode {
  name      : string;
}

export class Interaction {
  name      : string;
}

export class ResolutionScope {
  name      : string;
}

export class Behaviour {
  category  : string;
  verb      : string;
}

export class SocialObjective {
  name      : string;
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
  delivery_mode         : DeliveryMode[];
  interaction           : Interaction[];
  resolution_scope      : ResolutionScope[];
  behaviour             : Behaviour[];
  affective_objectives  : AffectiveObjective[];
  social_objectives     : SocialObjective[];
  task_types            : TaskType[];
  psychologist          : User;
}
