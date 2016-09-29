System.register(['angular2/core', './orfile-providerIdfilter.pipe', './orfile-fileTypefilter.pipe', './orfile-subsystemfilter.pipe', './orfile-orfilefilter.pipe'], function(exports_1, context_1) {
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
    var core_1, orfile_providerIdfilter_pipe_1, orfile_fileTypefilter_pipe_1, orfile_subsystemfilter_pipe_1, orfile_orfilefilter_pipe_1;
    var ORFileListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (orfile_providerIdfilter_pipe_1_1) {
                orfile_providerIdfilter_pipe_1 = orfile_providerIdfilter_pipe_1_1;
            },
            function (orfile_fileTypefilter_pipe_1_1) {
                orfile_fileTypefilter_pipe_1 = orfile_fileTypefilter_pipe_1_1;
            },
            function (orfile_subsystemfilter_pipe_1_1) {
                orfile_subsystemfilter_pipe_1 = orfile_subsystemfilter_pipe_1_1;
            },
            function (orfile_orfilefilter_pipe_1_1) {
                orfile_orfilefilter_pipe_1 = orfile_orfilefilter_pipe_1_1;
            }],
        execute: function() {
            ORFileListComponent = (function () {
                function ORFileListComponent() {
                    this.pageTitle = 'OR Status';
                    this.providerFilter = '';
                    this.fileTypeFilter = '';
                    this.subsystemFilter = '';
                    this.statusFilter = '';
                    this.orfiles = [
                        {
                            "orFileId": 1,
                            "providerId": "100200",
                            "fileType": "OR Time",
                            "subsystemDetailType": "Cath Lab Implant Log",
                            "dateFileReceived": "March 19, 2016",
                            "dataFileName": "OR_Sys_MAR2016.txt",
                            "step": "Publish",
                            "status": "Case Complete",
                            "error": "",
                            "retry": 0,
                            "utility": ""
                        },
                        {
                            "orFileId": 2,
                            "providerId": "100200",
                            "fileType": "OR Implant Log",
                            "subsystemDetailType": "Operating ROom Implant Log",
                            "dateFileReceived": "April 20, 2016",
                            "dataFileName": "OR_Log_APR2016.txt.",
                            "step": "PurgeAll",
                            "status": "Failed",
                            "error": "JDBC Timeout",
                            "retry": 0,
                            "utility": ""
                        },
                        {
                            "orFileId": 3,
                            "providerId": "100086",
                            "fileType": "OR Implant Log",
                            "subsystemDetailType": "Operating ROom Implant Log",
                            "dateFileReceived": "April 20, 2016",
                            "dataFileName": "OR_Log_Feb2016.txt.",
                            "step": "PurgeAll",
                            "status": "Paused",
                            "error": "JDBC Timeout",
                            "retry": 0,
                            "utility": ""
                        },
                        {
                            "orFileId": 4,
                            "providerId": "100086",
                            "fileType": "OR Time",
                            "subsystemDetailType": "Surgery Log",
                            "dateFileReceived": "April 20, 2016",
                            "dataFileName": "OR_Log_APR2016v2.txt.",
                            "step": "PurgeAll",
                            "status": "Case Complete",
                            "error": "",
                            "retry": 0,
                            "utility": ""
                        },
                    ];
                }
                ORFileListComponent.prototype.ngOnInit = function () {
                    console.log('IN  OnInit');
                };
                ORFileListComponent.prototype.refreshORList = function () {
                    console.log('REFRESHED');
                };
                ORFileListComponent = __decorate([
                    core_1.Component({
                        selector: 'orw-orfiles',
                        templateUrl: 'app/orfiles/orfile-list.component.html',
                        styleUrls: ['app/orfiles/orfile-list.component.css'],
                        pipes: ([orfile_providerIdfilter_pipe_1.ProviderIdFilterPipe], [orfile_fileTypefilter_pipe_1.FileTypeFilterPipe], [orfile_subsystemfilter_pipe_1.SubsystemFilterPipe], [orfile_orfilefilter_pipe_1.ORFileFilterPipe])
                    }), 
                    __metadata('design:paramtypes', [])
                ], ORFileListComponent);
                return ORFileListComponent;
            }());
            exports_1("ORFileListComponent", ORFileListComponent);
        }
    }
});
//# sourceMappingURL=orfile-list.component.js.map