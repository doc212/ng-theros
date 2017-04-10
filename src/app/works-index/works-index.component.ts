import { Component, OnInit } from '@angular/core';
import { WorksService } from "app/services/works.service";
import { Work } from "app/models/work";
import * as _ from "lodash";

@Component({
  selector: 'app-works-index',
  templateUrl: './works-index.component.html.slim',
  styleUrls: ['./works-index.component.css']
})
export class WorksIndexComponent implements OnInit {

  constructor(
    private worksService: WorksService
  ) { }

  works: Work[];
  filteredWorks: Work[];

  ngOnInit() {
    this.worksService.getWorks().then(works => {
      this.works = works;
      this.filteredWorks = works;
    });
  }

  filter(terms: string): void {
    console.log("filtering", terms)
    if (!terms) {
      console.log("not terms")
      this.filteredWorks = this.works;
      return;
    }
    let allTerms = terms.toLowerCase().split(" ").filter((t) => t !== "");
    console.log(allTerms);
    this.filteredWorks = this.works.filter((w) => {
      let all = [
        w.student,
        w.class,
        w.type,
        w.subject,
        w.teacher
      ].join(" ").toLowerCase();
      var match = true;
      _.forEach(allTerms, (t) => {
        if (!all.includes(t)) {
          match = false;
          return false;
        }
      })
      return match;
    })
  }

}
