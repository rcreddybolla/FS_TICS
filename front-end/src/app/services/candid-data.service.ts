import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Candidate } from '../model/candidate';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CandidDataService {

  constructor(private http: Http) { }

     // List all candidates as per the search query
    getCandidates(searchCriteria: string): Observable<Candidate[]> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('_id', searchCriteria);

        return this.http.get('http://' + window.location.host.split(':')[0] + ':3001', { search: params })
                .map((res: any) => {
                    return res.json();
                })
                .catch((error: any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error');
                });
    }

    // Insert a new candidate
    insertNewCandidate(candid: Candidate): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3001/newCandidate', candid)
            .map((res: any) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error');
            });
    }

}
