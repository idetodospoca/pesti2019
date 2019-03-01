import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Activity, LearningObjective } from '../../../models';


@Component({
  selector: 'app-create-activities',
  templateUrl: './create-activities.component.html',
  styleUrls: ['./create-activities.component.scss']
})
export class CreateActivitiesComponent implements OnInit {


  constructor( private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {

  }

}
