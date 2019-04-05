export class Task {
  type        : string;
  description : string;
  role        : string;
  resources   : string[];
}

export class Phase {
  name  : string;
  tasks : Task[];
}

export class Module {
  name   : string;
  phases : Phase[];
}

export class Structure {
  modules : Module[];
}
