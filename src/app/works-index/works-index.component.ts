import { Component, OnInit } from '@angular/core';
import { WorksService } from "app/services/works.service";
import {AuthService} from "app/services/auth.service";
import { Work } from "app/models/work";
import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/combineLatest";

type RESULT_TYPE = "ALL" | "ME" | "NONE";

@Component({
  selector: 'app-works-index',
  templateUrl: './works-index.component.html.slim',
  styleUrls: ['./works-index.component.css']
})
export class WorksIndexComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private worksService: WorksService
  ) { }

  works: Work[];
  filteredWorks: Work[];
  private _typeFilter = "";
  private _typeFilter$ = new BehaviorSubject<string>("");
  get typeFilter() {
    return this._typeFilter;
  }
  set typeFilter(value) {
    this._typeFilter = value;
    this._typeFilter$.next(value);
  }

  private _resultFilter: RESULT_TYPE = "ALL";
  private _resultFilter$ = new BehaviorSubject<RESULT_TYPE>("ALL");
  get resultFilter() {
    return this._resultFilter;
  }
  set resultFilter(value) {
    this._resultFilter = value;
    this._resultFilter$.next(value);
  }


  private searchTerms$ = new BehaviorSubject<string>("");

  ngOnInit() {
    this.searchTerms$
      .debounceTime(200)
      .combineLatest(this._typeFilter$, this._resultFilter$)
      .subscribe(([s, type, result]) => {
        this.search(s, type, result);
      });
    this.worksService.getWorks().then(works => {
      this.works = works;
      this.filteredWorks = works;
    });
  }

  filter(terms: string): void {
    this.searchTerms$.next(terms);
  }

  private search(terms: string, type: string, result: RESULT_TYPE): void {
    console.log("search", arguments);
    let base = this.works;
    if (type || result != "ALL") {
      base = this.works.filter((w) => {
        if (type && w.type != type) return false;
        switch (result) {
          case "ALL": return true;
          case "ME": return w.teacher == this.auth.currentUser.fullname;
          case "NONE": return !w.teacher;
        }
      });
    }
    if (!terms) {
      this.filteredWorks = base;
      return;
    }
    let allTerms = this.normalize(terms).split(" ").filter((t) => t !== "");
    this.filteredWorks = base.filter((w) => {
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
