import { Component, OnInit } from '@angular/core';
import { WorksService } from "app/services/works.service";
import { Work } from "app/models/work";
import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/debounceTime";

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

  private searchTerms$ = new BehaviorSubject<string>("");

  ngOnInit() {
    this.searchTerms$
      .debounceTime(200)
      .subscribe((s) => { this.search(s); });
    this.worksService.getWorks().then(works => {
      this.works = works;
      this.filteredWorks = works;
    });
  }

  filter(terms: string): void {
    this.searchTerms$.next(terms);
  }

  private search(terms: string): void {
    if (!terms) {
      this.filteredWorks = this.works;
      return;
    }
    let allTerms = this.normalize(terms).split(" ").filter((t) => t !== "");
    this.filteredWorks = this.works.filter((w) => {
      let all = [
        w.student,
        w.class,
        w.type,
        w.subject,
        w.teacher
      ].join(" ");
      all = this.normalize(all);
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

  private replacements = {
    "e": /[éèêë]/g,
    "a": /[àäâ]/g,
    "i": /[ïî]/g,
    "o": /[ô]/g,
    "u": /[ù]/g
  };
  private normalize(s: string): string {
    s = s.toLowerCase();
    _.each(this.replacements, (value, key) => {
      s = s.replace(value, key);
    })
    return s;
  }

}
