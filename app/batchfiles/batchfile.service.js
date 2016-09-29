System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, Observable_1;
    var BatchFileService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            BatchFileService = (function () {
                function BatchFileService(_http) {
                    this._http = _http;
                    //private _orfileUrl = 'http://crp12vdtib03:8080/ORWorkflow/service';
                    this._batchfileUrl = 'api/batchfiles/batchfiles.json';
                    this.loading = false;
                }
                BatchFileService.prototype._getBatchFilesOrig = function () {
                    return this._http.get(this._batchfileUrl)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All: " + JSON.stringify(data)); })
                        .catch(this.throwStatus);
                };
                BatchFileService.prototype.getBatchFiles = function () {
                    var _this = this;
                    return this._http.get(this._batchfileUrl)
                        .finally(function () { return _this.loading = false; })
                        .map(function (response) { return response.json(); })
                        .catch(this.throwStatus);
                };
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
                BatchFileService.prototype.postUpdates = function (updates) {
                    console.log('IN postUpdates  updates: ' + updates);
                    var body = JSON.stringify(updates);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._batchfileUrl + "/newVarCostlist", body, options)
                        .do(function (data) { return console.log("POST Response: " + JSON.stringify(data)); })
                        .map(this.checkResponseStatus)
                        .catch(this.throwStatus);
                };
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
                BatchFileService.prototype.throwStatus = function (error) {
                    console.log('IN throwStatus  error.status = ' + error.status);
                    console.error(error.status);
                    return Observable_1.Observable.throw(error.status || 'Server error');
                };
                BatchFileService.prototype.checkResponseStatus = function (res) {
                    var status;
                    // check if empty, before call json
                    if (res.status) {
                        status = res.status;
                    }
                    console.log('IN  checkResponseStatus STATUS:' + status);
                    return status || {};
                };
                BatchFileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], BatchFileService);
                return BatchFileService;
            }());
            exports_1("BatchFileService", BatchFileService);
        }
    }
});
//# sourceMappingURL=batchfile.service.js.map