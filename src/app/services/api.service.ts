import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, Headers } from "@angular/http";

import "rxjs/add/operator/toPromise";

const API_URL = "http://localhost/~doc212/theros/app_dev.php/api";

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) { }

  token: string;

  get(url: string): Promise<Response> {
    return this.http.get(this.getUrl(url), this.getRequestionOptions()).toPromise();
  }

  post(url: string, data: any): Promise<Response> {
    return this.http.post(this.getUrl(url), data, this.getRequestionOptions()).toPromise();
  }

  private getUrl(url: string): string {
    return API_URL + url;
  }

  private getRequestionOptions(): RequestOptionsArgs {
    if (this.token) {
      return {
        headers: new Headers(
          { "Authorization": "Bearer " + this.token }
        )
      };
    }
    else {
      return null;
    }
  }
}
