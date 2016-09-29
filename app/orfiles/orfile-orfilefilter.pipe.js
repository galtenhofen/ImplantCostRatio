System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var ORFileFilterPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            ORFileFilterPipe = (function () {
                function ORFileFilterPipe() {
                }
                /*
                                transform(value:IORFile[], args: string[]): IORFile[]{
                                    console.log("args:" + args);
                                    let provfilter: string = args[0] ? args[0].toLocaleLowerCase(): null;
                                    let filefilter: string = args[1] ? args[1].toLocaleLowerCase(): null;
                                    let subfilter: string = args[2] ? args[2].toLocaleLowerCase(): null;
                                    let statfilter: string = args[3] ? args[3].toLocaleLowerCase(): null;
                */
                ORFileFilterPipe.prototype.transform = function (value, argProv, argFile, argSub, argStat) {
                    var provfilter = argProv ? argProv.toLocaleLowerCase() : null;
                    var filefilter = argFile ? argFile.toLocaleLowerCase() : null;
                    var subfilter = argSub ? argSub.toLocaleLowerCase() : null;
                    var statfilter = argStat ? argStat.toLocaleLowerCase() : null;
                    console.log("prov: " + provfilter + " - file: " + filefilter + " - sub: " + subfilter + " - stat: " + statfilter);
                    if (provfilter) {
                        value = value.filter(function (orfile) {
                            return orfile.providerID.toLocaleLowerCase().indexOf(provfilter) != -1;
                        });
                    }
                    if (filefilter) {
                        value = value.filter(function (value) {
                            return value.fileType.toLocaleLowerCase().indexOf(filefilter) != -1;
                        });
                    }
                    if (subfilter) {
                        value = value.filter(function (value) {
                            return value.fileType_SubsystemDetailType.toLocaleLowerCase().indexOf(subfilter) != -1;
                        });
                    }
                    if (statfilter) {
                        if (statfilter === "open cases") {
                            value = value.filter(function (value) {
                                return (value.processStatus.toLocaleLowerCase().indexOf("failed") != -1 || value.processStatus.toLocaleLowerCase().indexOf("in progress") != -1 || value.processStatus.toLocaleLowerCase().indexOf("pending") != -1 || value.processStatus.toLocaleLowerCase().indexOf("waiting for match") != -1 || value.processStatus.toLocaleLowerCase().indexOf("matched") != -1 || value.processStatus.toLocaleLowerCase().indexOf("not matched") != -1);
                            });
                        }
                        else {
                            value = value.filter(function (value) {
                                return value.processStatus.toLocaleLowerCase().indexOf(statfilter) != -1;
                            });
                        }
                    }
                    return value;
                };
                ORFileFilterPipe = __decorate([
                    core_1.Pipe({
                        name: 'orfileFilter'
                    }), 
                    __metadata('design:paramtypes', [])
                ], ORFileFilterPipe);
                return ORFileFilterPipe;
            }());
            exports_1("ORFileFilterPipe", ORFileFilterPipe);
        }
    }
});
//# sourceMappingURL=orfile-orfilefilter.pipe.js.map