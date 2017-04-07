import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";
import { Work } from "app/models/work";


@Injectable()
export class WorksService {

  constructor(
    private http: Http
  ) { }

  getWorks(): Promise<Work[]> {
    return this.http.get("assets/mock-data/works.json").map(resp => resp.json() as Work[]).toPromise();
  }
}
