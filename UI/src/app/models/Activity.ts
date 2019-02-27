import { User } from "./User";
import { LearningObjective } from "./LearningObjective";

export class Activity {
  id                  : string;
  description         : string;
  subject             : string;
  subject_matter      : string;
  delivery_mode       : string;
  interaction         : string;
  interrelationship   : string;
  motivation          : string;
  participation       : string;
  performance         : string;
  scope               : string;
  feedback_use        : string;
  age                 : number;
  professor           : User;
  learning_objectives : LearningObjective[];
}
