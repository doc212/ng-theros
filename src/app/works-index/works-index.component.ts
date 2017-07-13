import { Component, OnInit } from '@angular/core';
import { WorksService } from "app/services/works.service";
import {AuthService} from "app/services/auth.service";
import { Work } from "app/models/work";
import * as _ from "lodash";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/combineLatest";
import {SweetAlertService} from "ng2-sweetalert2";

type RESULT_TYPE = "ALL" | "ME" | "NONE";

@Component({
  providers: [SweetAlertService],
  selector: 'app-works-index',
  templateUrl: './works-index.component.html.slim',
  styleUrls: ['./works-index.component.css']
})
export class WorksIndexComponent implements OnInit {

  constructor(
    private swal: SweetAlertService,
    public auth: AuthService,
    private worksService: WorksService
  ) { }

  works: Work[];
  filteredWorks: Work[];
  private _baseFilter$ = new Subject();

  typeFilter = "";
  showMyResults = true;
  showOtherResults = false;
  showWithoutResults = true;
  refreshFilter() {
    this._baseFilter$.next();
  }

  private searchTerms$ = new BehaviorSubject<string>("");

  ngOnInit() {
    this.searchTerms$
      .debounceTime(200)
      .combineLatest(this._baseFilter$)
      .subscribe(([s, dummy]) => {
        this.search(s);
      });
    this.worksService.getWorks().then(works => {
      this.works = works;
      this.refreshFilter();
    });
  }

  filter(terms: string): void {
    this.searchTerms$.next(terms);
  }

  private search(terms: string): void {
    let base = this.works;
    let type = this.typeFilter;
    let showMyResults = this.showMyResults;
    let showOtherResults = this.showOtherResults;
    let showWithoutResults = this.showWithoutResults;
    if (type || !showMyResults || !showOtherResults || !showWithoutResults) {
      base = this.works.filter((w) => {
        if (type && w.type != type) return false;
        if (w.teacher == this.auth.currentUser.fullname && !showMyResults) return false;
        if (!showOtherResults && w.teacher && w.teacher != this.auth.currentUser.fullname) return false;
        if (!showWithoutResults && !w.teacher) return false;
        return true;
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

  delete(work: Work): void {
    console.log(this.swal);
    let swal = this.swal.swal;
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(function() {
      swal(
        'Deleted!',
        'Your file has been deleted.',
        'success'
      )
    })

  }

}
