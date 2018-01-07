import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { SERVER_API_URL } from '../../app.constants';
import {ResponseWrapper} from '../../shared/model/response-wrapper.model';
import {Group} from '../../shared/model/group.model';
import {createRequestOption} from '../../shared/model/request-util';

@Injectable()
export class GroupService {
  private resourceUrl = SERVER_API_URL + 'api/groups';

  constructor(private http: Http) { }

  create(group: Group): Observable<ResponseWrapper> {
    return this.http.post(this.resourceUrl, group)
      .map((res: Response) => this.convertResponse(res));
  }

  update(group: Group): Observable<ResponseWrapper> {
    return this.http.put(this.resourceUrl, group)
      .map((res: Response) => this.convertResponse(res));
  }

  find(id: number): Observable<Group> {
    return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => res.json());
  }

  query(req?: any): Observable<ResponseWrapper> {
    const options = createRequestOption(req);
    return this.http.get(this.resourceUrl, options)
      .map((res: Response) => this.convertResponse(res));
  }

  delete(id: number): Observable<Response> {
    return this.http.delete(`${this.resourceUrl}/${id}`);
  }

  authorities(): Observable<string[]> {
    return this.http.get(SERVER_API_URL + 'api/users/authorities').map((res: Response) => {
      const json = res.json();
      return <string[]> json;
    });
  }

  private convertResponse(res: Response): ResponseWrapper {
    const jsonResponse = res.json();
    return new ResponseWrapper(res.headers, jsonResponse, res.status);
  }
}
