import { LearningObjective } from "./LearningObjective";

export class Activity {
  description           : string;
  subject               : string;
  delivery_mode         : string;
  interaction           : string;
  scope                 : string;
  age                   : number;
  feedback_use          : string;
  interrelationship     : string;
  motivation            : string;
  participation         : string;
  performance           : string;
  learning_objectives   : LearningObjective[];
  affective_objectives  : string[];
  social_objectives     : string[];
}
