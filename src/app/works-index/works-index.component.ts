import { Component, OnInit } from '@angular/core';
import { WorksService } from "app/services/works.service";
import { Work } from "app/models/work";

@Component({
  selector: 'app-works-index',
  templateUrl: './works-index.component.html.slim',
  styleUrls: ['./works-index.component.css']
})
export class WorksIndexComponent implements OnInit {

  constructor(
    private worksService: WorksService
  ) { }

  works : Work[];

  ngOnInit() {
    this.worksService.getWorks().then(works => this.works = works);
  }

}
