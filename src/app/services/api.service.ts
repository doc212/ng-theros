import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import "rxjs/add/operator/toPromise";

const API_URL = "http://localhost/~doc212/theros/app_dev.php/api";

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  token: string;

  get<T>(url: string, params: { [detais: string]: any } = null): Promise<T> {
    let options = this.getRequestionOptions() || {};
    if (params) {
      options.params = params;
    }
    return this.http.get<T>(this.getUrl(url), options).toPromise();
  }

  post(url: string, data: any): Promise<Response> {
    return this.http.post<Response>(this.getUrl(url), data, this.getRequestionOptions()).toPromise();
  }

  put(url: string, data: any): Promise<Response> {
    return this.http.put<Response>(this.getUrl(url), data, this.getRequestionOptions()).toPromise();
  }

  private getUrl(url: string): string {
    return API_URL + url;
  }

  private getRequestionOptions(): {headers?: HttpHeaders, params?: any} {
    if (this.token) {
      return {
        headers: new HttpHeaders(
          { "Authorization": "Bearer " + this.token }
        )
      };
    }
    else {
      return null;
    }
  }
}
