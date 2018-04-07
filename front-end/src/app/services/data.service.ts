import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Questions } from '../model/questions';
import { Test } from '../model/test';
import { Submissions } from '../model/submissions';
import { Scores } from '../model/scores';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

    constructor(private http: Http) {
    }

    // list all the questions
    getQuestions(searchCriteria: string, source: string): Observable<Questions[]> {
        const params: URLSearchParams = new URLSearchParams();

        if (source === 'fromSubmitTest') {
               params.set('_id', searchCriteria);
        }else if (source === 'fromSimpleQuestions') {
            params.set('question_name', searchCriteria);
        }else if (source === 'fromCreateTest') {
            params.set('question_name', searchCriteria);
        }


        return this.http.get('http://' + window.location.host.split(':')[0] + ':3002', { search: params })
                .map((res: any) => {
                    return res.json();
                })
                .catch((error: any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error');
                });
    }

    // List all questions as per the category
    getCategoryQuestions(searchCriteria: any): Observable<Questions[]> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('question_category', searchCriteria);

        return this.http.get('http://' + window.location.host.split(':')[0] + ':3002', { search: params })
                .map((res: any) => {
                    return res.json();
                })
                .catch((error: any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error');
                });
    }

    // Get distinct candidates
    getCandidates(searchCriteria: any): Observable<any> {

        const params: URLSearchParams = new URLSearchParams();
        params.set('test_id', searchCriteria);

        return this.http.get('http://' + window.location.host.split(':')[0] + ':3002/getCandidates', { search: params }).map((res: any) => {
            return res.json();
        }).catch((error: any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error');
        });
    }

    // get candidate score
    getCandidateData(searchCriteria: any): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('candid_id', searchCriteria);

        return this.http.get('http://' + window.location.host.split(':')[0] + ':3002/getCandidData', { search: params }).map((res: any) => {
            return res.json();
        }).catch((error: any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error');
        });

    }

    // submit a new score
    submitNewScore(score: Scores): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3002/submitScore', score)
            .map((res: any) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error');
            });
    }

    // insert a new Questions
    insertNewQuestion(ques: Questions): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3002/insertQues', ques)
            .map((res: any) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error');
            });
    }

    // create a new Test
    createNewTest(test: Test): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3002/createTest', test)
            .map((res: any) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error');
            });
    }

    // submit a new answer
    submitAllAnswer(submit: Submissions): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3002/submitAnswer', submit)
            .map((res: any) => {
                return res.json();
            })
            .catch((error: any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error');
            });
    }

    // Fetch questions as per the Test
    getTestDetails(searchCriteria: any, source: any): Observable<Test[]> {
        const params: URLSearchParams = new URLSearchParams();

        if (source === 'viewTests') {
            params.set('designation', searchCriteria);
        }else if (source === 'takeTest') {
            params.set('_id', searchCriteria);
        }

        return this.http.get('http://' + window.location.host.split(':')[0] + ':3002/getTests', { search: params })
                .map((res: any) => {
                    return res.json();
                })
                .catch((error: any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error');
                });
    }

    // Delete a ques
    deleteQues(ques: Questions): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3002/deleteQues', { id: ques._id })
        .map((res: any) => {
            return res.json();
        })
        .catch((error: any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error');
        });
    }

    // Delete a test
    deleteTest(test: Test): Observable<any> {
        return this.http.post('http://' + window.location.host.split(':')[0] + ':3002/deleteTest', { id: test._id })
        .map((res: any) => {
            return res.json();
        })
        .catch((error: any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error');
        });
    }


    // Get scores for the test
    getScores(searchCriteria: any): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('test_id', searchCriteria);

        return this.http.get('http://' + window.location.host.split(':')[0] + ':3002/getScores', { search: params }).map((res: any) => {
            return res.json();
        }).catch((error: any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error');
        });

    }


    // Update a question
    //     updateUser(user:User) {
    //   this.userService
    //   .updateUser(this.newUser)
    //   .subscribe(
    //     data => {
    //        var index = this.users.findIndex(item => item._id === this.editUser._id);
    //        this.users[index] = this.editUser;
    //        this.editUser = User.CreateDefault();

    //        console.log("Added user.");
    //     }
    //   )
    // }
}
