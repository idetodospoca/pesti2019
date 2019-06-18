import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable } from 'rxjs';
import 'rxjs/add/observable/forkJoin';

import { Project, Technique, LearningObjective } from 'src/app/models';
import { MatSort, MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { TechniqueDetailsComponent } from '../../../dialogs/technique-details/technique-details.component';

import { FPGrowth, Itemset } from 'node-fpgrowth';

@Component({
  selector: 'app-recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.scss']
})
export class RecommendComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  dataSource                      = new MatTableDataSource([]);
  displayedColumns                : string[] = ['technique', 'details', 'similarity', 'choose'];

  dataSource_past_projects        = new MatTableDataSource([]);
  displayedColumns_projects       : string[] = ['project', 'technique', 'details', 'similarity', 'choose'];

  dataSource_mined                = new MatTableDataSource([]);
  displayedColumns_mined          : string[] = ['rules', 'details', 'support', 'choose'];

  dataSource_chosen               = new MatTableDataSource([]);
  displayedColumns_chosen         : string[] = ['technique', 'details', 'remove'];

  dataSource_empty                = new MatTableDataSource([]);
  displayedColumns_empty          : string[] = ['technique', 'details', 'similarity', 'choose'];

  loading         : boolean = false;
  sub             : Subscription;       // The route subscription object to handle params received in the url
  id              : string;             // Project id to recommend to

  //Recommendation Process
  project_rc        : Project = new Project();  // Project looking for recommendations

  past_projects     : Array<Project>    = [];       // Candidate past projects to recommend
  techniques_rc     : Array<Technique>  = [];       // Candidate techniques to recommend
  all_techniques    : Array<Technique>  = [];       // In case of no recomendations

  table_recs_techs                : any[][] = [];             // Table of recomendations for available techniques
  table_recs_past_projects        : any[][] = [];             // Table of recomendations for past projects
  table_recs_empty                : any[][] = [];             // Table of recomendations in case of no available recomendations

  transactions    : Technique[][] = [];
  mined_itemsets  : any[][] = [];

  confidence  : number = .8;

  constructor(
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.sub = this.activeRoute.params.subscribe(params => {
      this.id = params['id'];
      this.populateData();
    });
  }

  populateData() {
    this.loading = true;
    Observable.forkJoin(
      this.http.get<Project>(`projects/${this.id}`),
      this.http.get<Technique[]>('techniques'),
      this.http.get<Project[]>('projects')
    )
    .subscribe(response => {
      this.project_rc = response[0];
      this.techniques_rc = response[1];
      this.past_projects = response[2];

      this.filterData();

      if (this.techniques_rc.length == 0 && this.past_projects.length == 0) {

        for (let tech of response[1]) {
          this.similarityTechniqueAll(this.project_rc, tech);
        }
        console.log(this.table_recs_empty);
        setTimeout(() => this.dataSource_empty.data = this.table_recs_empty);

      }

      for (let prj of this.past_projects) {
        this.similarityProject(this.project_rc, prj);
        this.transactions.push(prj.techniques);
      }
      for (let tech of this.techniques_rc) {
        this.similarityTechnique(this.project_rc, tech);
        this.transactions.push(this.techniques_rc);
      }

      this.dataSource.data = this.table_recs_techs;
      this.dataSource_past_projects.data = this.table_recs_past_projects;

      this.mineItemsets();


      setTimeout(() => this.dataSource_chosen.data = this.project_rc.techniques);

      this.loading = false;
    }, err => this.handleError(err));
  }

  filterData() {

    // Filter techniques that include all context attributes
    this.techniques_rc = this.techniques_rc.filter(tech =>
      tech.delivery_mode.includes(this.project_rc.activity.delivery_mode) &&
      tech.interaction.includes(this.project_rc.activity.interaction) &&
      tech.interrelationship.includes(this.project_rc.activity.interrelationship) &&
      tech.motivation.includes(this.project_rc.activity.motivation) &&
      tech.participation.includes(this.project_rc.activity.participation) &&
      tech.performance.includes(this.project_rc.activity.performance) &&
      tech.resolution_scope.includes(this.project_rc.activity.scope) &&
      tech.feedback_use.includes(this.project_rc.activity.feedback_use) &&
      tech.target_audience.includes(this.project_rc.activity.age)
    );

    // Remove current project and projects in development
    this.past_projects = this.past_projects.filter(project => project._id !== this.id && project.status !== 'In Development');

    // Filter past projects that have the same context attributes
    this.past_projects = this.past_projects.filter(project =>
      project.activity.delivery_mode == this.project_rc.activity.delivery_mode &&
      project.activity.interaction == this.project_rc.activity.interaction &&
      project.activity.interrelationship == this.project_rc.activity.interrelationship &&
      project.activity.motivation == this.project_rc.activity.motivation &&
      project.activity.participation == this.project_rc.activity.participation &&
      project.activity.performance == this.project_rc.activity.performance &&
      project.activity.scope == this.project_rc.activity.scope &&
      project.activity.feedback_use == this.project_rc.activity.feedback_use &&
      project.activity.age == this.project_rc.activity.age);
  }

  // Similarity calculation between current project and a matching past project
  similarityProject(candidate: Project, recommender: Project)  {

    let a = 0;                    // total nr of LOs of candidate that match recommender
    let b = 0;                    // total nr of LOs of candidate that don't match recommender
    let c = 0;                    // total nr of LOs of recommender that don't match candidate

    for (let c_lo of candidate.activity.learning_objectives) {
      if (recommender.activity.learning_objectives.some(lo =>
        lo.knowledge_category === c_lo.knowledge_category
        && lo.behaviour === c_lo.behaviour
        && lo.subject_matter === c_lo.subject_matter)) {
          a++;
        }
    }

    for (let c_lo of candidate.activity.learning_objectives) {
      if (!(recommender.activity.learning_objectives.some(lo =>
        lo.knowledge_category === c_lo.knowledge_category
        && lo.behaviour === c_lo.behaviour
        && lo.subject_matter === c_lo.subject_matter))) {
          b++;
        }
    }

    for (let r_lo of recommender.activity.learning_objectives) {
      if (!(candidate.activity.learning_objectives.some(lo =>
        lo.knowledge_category === r_lo.knowledge_category
        && lo.behaviour === r_lo.behaviour
        && lo.subject_matter === r_lo.subject_matter))) {
          c++;
        }
    }

    this.table_recs_past_projects.push([candidate, recommender.techniques, (a + (a/(a+b+c))).toFixed(2)]);
  }

  // Similarity calculation between current project and a matching technique
  similarityTechnique(candidate: Project, recommender: Technique)  {

    let a = 0;                    // total nr of LOs of candidate that match recommender
    let b = 0;                    // total nr of LOs of candidate that don't match recommender
    let c = 0;                    // total nr of LOs of recommender that don't match candidate

    for (let c_lo of candidate.activity.learning_objectives) {
      if (recommender.learning_objectives.some(lo =>
        lo.knowledge_category === c_lo.knowledge_category
        && lo.behaviour === c_lo.behaviour
        && lo.subject_matter === c_lo.subject_matter)) {
          a++;
        }
    }

    for (let c_lo of candidate.activity.learning_objectives) {
      if (!(recommender.learning_objectives.some(lo =>
        lo.knowledge_category === c_lo.knowledge_category
        && lo.behaviour === c_lo.behaviour
        && lo.subject_matter === c_lo.subject_matter))) {
          b++;
        }
    }

    for (let r_lo of recommender.learning_objectives) {
      if (!(candidate.activity.learning_objectives.some(lo =>
        lo.knowledge_category === r_lo.knowledge_category
        && lo.behaviour === r_lo.behaviour
        && lo.subject_matter === r_lo.subject_matter))) {
          c++;
        }
    }

    this.table_recs_techs.push([candidate, [recommender], (a + (a/(a+b+c))).toFixed(2)]);
    this.table_recs_techs.sort(function(a, b) {
      return b[2] - a[2];
    });
  }

  // Similarity calculation between current project and all techniques
  similarityTechniqueAll(candidate: Project, recommender: Technique)  {

    let a = 0;                    // total nr of LOs of candidate that match recommender
    let b = 0;                    // total nr of LOs of candidate that don't match recommender
    let c = 0;                    // total nr of LOs of recommender that don't match candidate

    for (let c_lo of candidate.activity.learning_objectives) {
      if (recommender.learning_objectives.some(lo =>
        lo.knowledge_category === c_lo.knowledge_category
        && lo.behaviour === c_lo.behaviour
        && lo.subject_matter === c_lo.subject_matter)) {
          a++;
        }
    }

    for (let c_lo of candidate.activity.learning_objectives) {
      if (!(recommender.learning_objectives.some(lo =>
        lo.knowledge_category === c_lo.knowledge_category
        && lo.behaviour === c_lo.behaviour
        && lo.subject_matter === c_lo.subject_matter))) {
          b++;
        }
    }

    for (let r_lo of recommender.learning_objectives) {
      if (!(candidate.activity.learning_objectives.some(lo =>
        lo.knowledge_category === r_lo.knowledge_category
        && lo.behaviour === r_lo.behaviour
        && lo.subject_matter === r_lo.subject_matter))) {
          c++;
        }
    }

    this.table_recs_empty.push([[recommender], (a + (a/(a+b+c))).toFixed(2)]);
    this.table_recs_empty.sort(function(a, b) {
      return b[1] - a[1];
    });
  }


  showTechniques(techniques: Technique[]) {
    this.dialog.open(TechniqueDetailsComponent, {
      data: techniques
    });
  }

  addRecommendation (techniques: Technique[]) {
    for (let technique of techniques) {
      if (this.project_rc.techniques.filter(tech => tech._id === technique._id).length > 0) {
        this.toastr.error('has already been added.', technique.name);
      } else {
        this.project_rc.techniques.push(technique);
        setTimeout(() => this.dataSource_chosen.data = this.project_rc.techniques);
        this.toastr.success('successfully added.', technique.name);
      }
    }
  }

  removeRecommendation (number: number) {
    this.project_rc.techniques.splice(number, 1);
    setTimeout(() => this.dataSource_chosen.data = this.project_rc.techniques);
  }

  saveRecommendation() {
    this.http.put<Project>(`projects/${this.id}`, this.project_rc).subscribe(
      response => {
        this.toastr.success('Recommendation saved.', 'Success');
        this.router.navigate(['/']);
      },
      err => this.handleError(err)
    );
  }


  mineItemsets() {
    
    this.mined_itemsets = [];
    // Execute FPGrowth with a minimum support chosen. Algorithm is generic.
    let fpgrowth: FPGrowth<Technique> = new FPGrowth<Technique>(this.confidence);

    //Returns itemsets 'as soon as possible' through events.
    fpgrowth.on('data', (itemset: Itemset<LearningObjective>) => {
        // Do something with the frequent itemset.
        let support: number = itemset.support;
        let items: LearningObjective[] = itemset.items;
    });

    // Execute FPGrowth on a given set of transactions.
    fpgrowth.exec(this.transactions)
      .then( (itemsets: Itemset<Technique>[]) => {
        // Returns an array representing the frequent itemsets.
        for (let item of itemsets) {
          this.mined_itemsets.push([item.items, item.support]);
        }
        this.mined_itemsets.sort(function(a, b) {
          return b[1] - a[1];
        });
      });

      setTimeout(() => this.dataSource_mined.data = this.mined_itemsets);
      setTimeout(() => this.dataSource_mined.paginator = this.paginator);

  }


  private handleError(err: HttpErrorResponse) {
    if (err.status === 404) {
      this.toastr.error("The specified project doesn\'t exist.", "Error");
      this.router.navigate(['/projects']);
      return;
    }

    if (this.loading) {
      this.loading = false;
    }

    this.toastr.error(err.error.message, 'Error');
  }

}
