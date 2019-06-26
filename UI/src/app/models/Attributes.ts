import { User } from "./User"


export class DeliveryMode {
  _id           : string;
  name          : string;
  psychologist  : User;
}

export class Interaction {
  _id           : string;
  name          : string;
  psychologist  : User;
}

export class ResolutionScope {
  _id           : string;
  name          : string;
  psychologist  : User;
}

export class Behaviour {
  _id           : string;
  category      : string;
  verb          : string;
  psychologist  : User;
}

export class SocialObjective {
  _id           : string;
  name          : string;
  psychologist  : User;
}

export class AffectiveObjective {
  _id           : string;
  category      : string;
  verb          : string;
  psychologist  : User;
}

export class TaskType {
  _id           : string;
  category      : string;
  verb          : string;
  psychologist  : User;
}
