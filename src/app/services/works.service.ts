import { Injectable } from '@angular/core';
import { Work } from "app/models/work";
import { ApiService } from "app/services/api.service";


@Injectable()
export class WorksService {

  constructor(
    private api: ApiService
  ) { }

  getWorks(): Promise<Work[]> {
    return this.api.get("/works").then(resp => resp.json());
  }
}
