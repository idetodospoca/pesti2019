import { Component, OnInit } from '@angular/core';
import { LearningObjective } from '../../models/LearningObjective';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-learningobjective',
  templateUrl: './learningobjective.component.html',
  styleUrls: ['./learningobjective.component.scss']
})
export class LearningobjectiveComponent implements OnInit {

  learning_objectives : Array<LearningObjective> = [];


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
