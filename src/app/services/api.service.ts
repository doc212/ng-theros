import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";

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
      let options: RequestOptionsArgs;
      options.headers.append("Authorization", "Bearer " + this.token);
      return options;
    }
    else {
      return null;
    }

  }

}
