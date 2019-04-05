import { User } from "./User";
import { LearningObjective } from "./LearningObjective";
import { Structure } from "./Structure";

export class Technique {
  id                    : string;
  name                  : string;
  description           : string;
  rules                 : string[];
  delivery_mode         : string[];
  interaction           : string[];
  interrelationship     : string[];
  motivation            : string[];
  participation         : string[];
  performance           : string[];
  scope                 : string[];
  feedback_use          : string[];
  target_audience       : number[];
  learning_objectives   : LearningObjective[];
  affective_objectives  : string[];
  social_objectives     : string[];
  structure             : Structure;
  psychologist          : User;
}
