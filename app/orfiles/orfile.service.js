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
    var ORFileService;
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
            ORFileService = (function () {
                function ORFileService(_http) {
                    this._http = _http;
                    this._orfileUrl = 'http://crp12vdtib03:8080/ORWorkflow/service';
                    this.loading = false;
                }
                ORFileService.prototype.getORFilesToday = function () {
                    return this._http.get(this._orfileUrl)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("All: " + JSON.stringify(data)); })
                        .catch(this.throwStatus);
                };
                ORFileService.prototype.getORFilesByDate = function (beginDate, endDate) {
                    var _this = this;
                    console.log("IN getORFilesByDate -   URL: " + this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate);
                    return this._http.get(this._orfileUrl + "/status" + "/" + beginDate + "/" + endDate)
                        .finally(function () { return _this.loading = false; })
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log("IN getORFilesByDate -   By Date: " + JSON.stringify(data)); })
                        .catch(this.throwStatus);
                };
                ORFileService.prototype.postRunUtilities = function (utilities) {
                    console.log('IN postRunUtility  utilities: ' + utilities);
                    var body = JSON.stringify(utilities);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._orfileUrl + "/ordatalist", body, options)
                        .do(function (data) { return console.log("POST Response: " + JSON.stringify(data)); })
                        .map(this.checkResponseStatus)
                        .catch(this.throwStatus);
                };
                ORFileService.prototype.postReleaseRetry = function (retries) {
                    console.log('IN postReleaseRetry  retries: ' + retries);
                    var body = JSON.stringify(retries);
                    var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    var options = new http_1.RequestOptions({ headers: headers });
                    return this._http.post(this._orfileUrl + "/ordatalist", body, options)
                        .do(function (data) { return console.log("POST Response: " + JSON.stringify(data)); })
                        .map(this.checkResponseStatus)
                        .catch(this.throwStatus);
                };
                ORFileService.prototype.throwStatus = function (error) {
                    console.log('IN throwStatus  error.status = ' + error.status);
                    console.error(error.status);
                    return Observable_1.Observable.throw(error.status || 'Server error');
                };
                ORFileService.prototype.checkResponseStatus = function (res) {
                    var status;
                    // check if empty, before call json
                    if (res.status) {
                        status = res.status;
                    }
                    console.log('IN  checkResponseStatus STATUS:' + status);
                    return status || {};
                };
                ORFileService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ORFileService);
                return ORFileService;
            }());
            exports_1("ORFileService", ORFileService);
        }
    }
});
//# sourceMappingURL=orfile.service.js.map