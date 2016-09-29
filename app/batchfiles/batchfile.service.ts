import {Component,Injectable,Input,Output,EventEmitter } from 'angular2/core';
import {IBatchFile} from './batchfile';
import {IResponse} from './response';
import {ILoadInfo} from './loadInfo';
import {Http, Request, Response, Headers, RequestOptions, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BatchFileService{
        //private _orfileUrl = 'http://crp12vdtib03:8080/ORWorkflow/service';
private _batchfileUrl = 'api/batchfiles/batchfiles1.json'; 
        
        loading:boolean; 

        constructor(private _http: Http){ this.loading=false; }
    
        getBatchFiles(): Observable<IBatchFile[]>{
                     return this._http.get(this._batchfileUrl)
                    .map((response: Response) => <IBatchFile[]>response.json())
                    .do(data => console.log("All: " + JSON.stringify(data)))
                    .catch(this.throwStatus);
                    }

        _getBatchFiles_TOPLEVEL(): Observable<IResponse>{
                     return this._http.get(this._batchfileUrl)
                      .finally( () => this.loading = false)
                    .map((response: Response) => <IResponse>response.json())
                    //.do(data => console.log("All: " + JSON.stringify(data)))
                    .catch(this.throwStatus);
                    }            
/*
        getORFilesByDate(beginDate:string, endDate:string): Observable<IBatchFile[]>{ 
                     console.log("IN getORFilesByDate -   URL: " +this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate);
                     return this._http.get(this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate) 
                    .finally( () => this.loading = false)
                    .map((response: Response) => <IBatchFile[]>response.json())
                    .do(data => console.log("IN getORFilesByDate -   By Date: " + JSON.stringify(data)))
                    .catch(this.throwStatus)
                    

                   }
*/
        postUpdates(updates) {
                console.log('IN postUpdates  updates: ' + updates);
                let body = JSON.stringify(updates);
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });

                return this._http.post(this._batchfileUrl + "/dataFileGroupId", body, options)
                    .do(data => console.log("POST Response: " + JSON.stringify(data)))
                    .map(this.checkResponseStatus)
                    .catch(this.throwStatus);
                    }
   /*    
        postReleaseRetry(retries) {
                console.log('IN postReleaseRetry  retries: ' + retries);
                let body = JSON.stringify(retries);
                let headers = new Headers({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });

                return this._http.post(this._orfileUrl + "/ordatalist", body, options)
                    .do(data => console.log("POST Response: " + JSON.stringify(data)))
                    .map(this.checkResponseStatus)
                    .catch(this.throwStatus);
                    }
*/
        private throwStatus(error: Response){
            console.log('IN throwStatus  error.status = ' + error.status);
            console.error(error.status);
            return Observable.throw(error.status || 'Server error');

        }

        private checkResponseStatus(res: Response) {
            let status;

            // check if empty, before call json
             if (res.status) {
                status = res.status;
                }
            console.log('IN  checkResponseStatus STATUS:' + status);
            return status || {};
        }
}