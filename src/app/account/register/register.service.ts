import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {SERVER_API_URL} from '../../app.constants';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class Register {

  constructor(private http: Http, private httpClient: HttpClient) {
  }

  save(account: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/register', account);
  }

  getGroups(): Observable<any> {
    return this.httpClient.get(SERVER_API_URL + 'api/groups');
  }
}
