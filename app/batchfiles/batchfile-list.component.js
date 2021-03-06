System.register(['angular2/core', '../utilities/utility-list.component', './batchfile.service', '../shared/confirm/confirm.service', '../shared/confirm/confirm.component', 'angular2/router', "../windowservice/window.service"], function(exports_1, context_1) {
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
    var core_1, utility_list_component_1, batchfile_service_1, confirm_service_1, confirm_component_1, router_1, window_service_1;
    var BatchFileListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utility_list_component_1_1) {
                utility_list_component_1 = utility_list_component_1_1;
            },
            function (batchfile_service_1_1) {
                batchfile_service_1 = batchfile_service_1_1;
            },
            function (confirm_service_1_1) {
                confirm_service_1 = confirm_service_1_1;
            },
            function (confirm_component_1_1) {
                confirm_component_1 = confirm_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (window_service_1_1) {
                window_service_1 = window_service_1_1;
            }],
        execute: function() {
            BatchFileListComponent = (function () {
                function BatchFileListComponent(_batchfileService, _confirmService, windowService) {
                    this._batchfileService = _batchfileService;
                    this._confirmService = _confirmService;
                    this.windowService = windowService;
                    this.pageTitle = 'Implant Cost Ratio';
                    this.updateList = [];
                    this.newVarCostUpdates = [];
                    this.updateObjects = [];
                    this.confirmResponse = '';
                    this.loading = false;
                    this.override = false;
                    this.loading = this._batchfileService.loading;
                }
                BatchFileListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('IN  OnInit');
                    componentHandler.upgradeDom();
                    console.log('Retrieving Batch Files...');
                    this.loading = true;
                    /*  ORIGINAL - for use without top level DATA in json response
                    
                         this._batchfileService.getBatchFiles()
                                    .subscribe(
                                        batchfiles => this.batchfiles = batchfiles,
                                        error => this.errorMessage = <any>error,
                                        () => this.onRequestComplete());
                    */
                    this._batchfileService.getBatchFiles()
                        .subscribe(function (response) { return _this.batchfiles = response.record; }, function (error) { return _this.errorMessage = error; }, function () { return _this.onRequestComplete(); });
                };
                /*
                 showConfirmDialog(stringTitle) {
                     console.log('IN showConfirmDialog  action: ' + stringTitle);
                     var stringMessage:string;
                     if(stringTitle === "DataUtilties"){
                         stringMessage = "Are you sure you want to run selected Data Utilities?"
                     }
                      if(stringTitle === "ReleaseRetry"){
                         stringMessage = "Are you sure you want to release selected Retry items?"
                
                
                     }
                        this._confirmService.activate(stringMessage, stringTitle)
                       .then(res => this.completeRequest(stringTitle, res));
                
                   }
                
                   completeRequest(strTitle, boolConfirm) {
                
                           if(boolConfirm){
                               if(strTitle === "DataUtilities"){
                                    this._orfileService.postRunUtilities(this.utilityObjects)
                                    .subscribe(
                                    data => this.postDataUtilities = JSON.stringify(data),
                                    error => this.errorMessage = <any>error);
                                }
                                if(strTitle === "ReleaseRetry"){
                                    this._orfileService.postReleaseRetry(this.retryObjects)
                                    .subscribe(
                                    data => this.postRetries = JSON.stringify(data),
                                    error => this.errorMessage = <any>error);
                                }
                            }
                            else{console.log('Requested cancelled by user');}
                   }
                */
                BatchFileListComponent.prototype.onClickrefreshBatchList = function () {
                    var _this = this;
                    this.disableButtons();
                    //var run:boolean = this.validateReceivedDates(this.beginDate, this.endDate);
                    //if (run == true){
                    this.batchfiles = [];
                    this.loading = true;
                    this._batchfileService.getBatchFiles()
                        .subscribe(function (batchfiles) { return _this.batchfiles = batchfiles; }, function (error) { return _this.errorMessage = error; }, 
                    //() => (this.loading = this._orfileService.loading));
                    function () { return (_this.onRequestComplete()); });
                    // }
                    // else{
                    //    alert('You entered a begin date ('+this.beginDate+') that is after the end date ('+this.endDate+ ') and that makes no sense.');
                    //    console.log('You fucked up the dates');
                    // }
                    console.log('Leaving onClickrefreshBatchList this.loading: ' + this.loading);
                };
                BatchFileListComponent.prototype.onToggleUpdate = function (jsxid, updated) {
                    console.log('Update button clicked.  BatchId: ' + jsxid + '  Current value = ' + updated);
                    this.update = { "batchId": jsxid, "newVarCost": null, "updated": updated };
                    //if the jsxid id exists, remove current value first
                    for (var i = 0; i < this.updateObjects.length; i++) {
                        if (this.updateObjects[i].batchId == jsxid) {
                            this.updateObjects.splice(i, 1);
                            break;
                        }
                    }
                    if (updated == true) {
                        //then add it in if updated = true
                        this.updateObjects.push(this.update);
                    }
                    console.log('updateObj: ' + this.updateObjects);
                    console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
                    console.log('batchFiles length: ' + this.batchfiles.length);
                    /*
                            if(updated== true){
                            this.updateObjects.push(this.update);
                            console.log('retryObj: ' + this.updateObjects);
                            console.log('stringify retryObj: ' + JSON.stringify(this.updateObjects));
                            }
                            else{
                    
                                for(var i = 0; i <  this.updateObjects.length; i++) {
                                    if( this.updateObjects[i].batchId == jsxid) {
                                         this.updateObjects.splice(i, 1);
                                        break;
                                        }
                            }
                              
                              console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
                            }*/
                    this.canEnableButtons();
                };
                BatchFileListComponent.prototype.onUpdateVarCost = function (jsxid, varCost) {
                    console.log('VarCost Updated.  BatchId: ' + jsxid + '  Current value = ' + varCost);
                    if (varCost != null && varCost != "" && varCost >= 1) {
                        this.update = { "batchId": jsxid, "newVarCost": varCost, updated: false };
                        //if this batchid is already in the updated array, need to delete it before adding new value
                        if (varCost != "" && varCost != null) {
                            for (var i = 0; i < this.updateObjects.length; i++) {
                                if (this.updateObjects[i].batchId == jsxid) {
                                    this.updateObjects.splice(i, 1);
                                    break;
                                }
                            }
                            this.updateObjects.push(this.update);
                            console.log('retryObj: ' + this.updateObjects);
                            console.log('stringify retryObj: ' + JSON.stringify(this.updateObjects));
                        }
                        else {
                            for (var i = 0; i < this.updateObjects.length; i++) {
                                if (this.updateObjects[i].batchId == jsxid) {
                                    this.updateObjects.splice(i, 1);
                                    break;
                                }
                            }
                            console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
                        }
                        console.log('updateObjects length: ' + this.updateObjects.length);
                        console.log('batchFiles length: ' + this.batchfiles.length);
                        this.canEnableButtons();
                    }
                    else {
                        alert("Value must be a number greater or equal to one.");
                        var targetCell = "updateVarCost" + jsxid;
                        document.getElementById(targetCell).value = "";
                    }
                };
                BatchFileListComponent.prototype.onClickSubmit = function () {
                    var _this = this;
                    console.log('IN onClickSubmit  ');
                    console.log('this.updateObjects: ' + this.updateObjects);
                    console.log('filtered updateObjects: ' + this.updateObjects.filter(function (update) { return update.newVarCost != null; }));
                    this.newVarCostUpdates = this.updateObjects.filter(function (update) { return update.newVarCost != null; });
                    console.log('stringify updateObjects: ' + JSON.stringify(this.newVarCostUpdates));
                    this._batchfileService.postUpdates(this.newVarCostUpdates)
                        .subscribe(function (data) { return _this.postUpdates = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
                };
                BatchFileListComponent.prototype.onClickClose = function () {
                    console.log('Close App');
                    if (confirm('You wanna close the app?')) {
                        alert("This app took me a long time to develop, so you're gonna sit there and use it some more.");
                    }
                };
                BatchFileListComponent.prototype.onChangeOverride = function (override) {
                    console.log('Override: ' + override);
                    // this.beginDate = selectedDate.toString();
                    // console.log('Begin Date: ' + this.beginDate);
                    // var beginString: string = ((this.beginDate).getFullYear()).toString() + "/" + ((this.beginDate).getMonth()).toString() + "/" + ((this.beginDate).getDay()).toString();
                    //console.log('beginString: ' + beginString);
                    this.override = override;
                };
                BatchFileListComponent.prototype.showOrFileDetail = function () {
                    console.log('IN  showOrFileDetail');
                };
                BatchFileListComponent.prototype.onRequestComplete = function () {
                    this.loading = this._batchfileService.loading;
                    this.canEnableButtons();
                    //this.enableButtons();
                };
                BatchFileListComponent.prototype.canEnableButtons = function () {
                    if (this.batchfiles.length - this.updateObjects.length > 0) {
                        document.getElementById('submitBtn').disabled = true;
                    }
                    else {
                        document.getElementById('submitBtn').disabled = false;
                    }
                    /* if(!this.utilityObjects || this.utilityObjects.length < 1 ){
                            (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = true;
                        }
                        else{
                            (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = false;
                        }   */
                };
                BatchFileListComponent.prototype.disableButtons = function () {
                    document.getElementById('submitBtn').disabled = true;
                    // (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = true;
                };
                BatchFileListComponent.prototype.enableButtons = function () {
                    document.getElementById('submitBtn').disabled = false;
                    // (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = false;
                };
                BatchFileListComponent.prototype.makeTableScroll = function () {
                    var maxRows = 10;
                    var table = document.getElementById('batchFilesTable').value;
                    var wrapper = document.getElementById('batchFilesTable').parentNode;
                    //var wrapper = table.parentNode;
                    var rowsInTable = table.rows.length;
                    var height = 0;
                    if (rowsInTable > maxRows) {
                        for (var i = 0; i < maxRows; i++) {
                            height += table.rows[i].clientHeight;
                        }
                        wrapper.style.height = height + "px";
                    }
                };
                BatchFileListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/batchfiles/batchfile-list.component.html',
                        styleUrls: ['app/batchfiles/batchfile-list.component.css', 'app/shared/confirm/confirm.component.css'],
                        //pipes:([ProviderIdFilterPipe],[FileTypeFilterPipe],[SubsystemFilterPipe],[ORFileFilterPipe]),
                        directives: [utility_list_component_1.UtilityListComponent, confirm_component_1.ConfirmComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [confirm_service_1.ConfirmService, window_service_1.WindowService]
                    }), 
                    __metadata('design:paramtypes', [batchfile_service_1.BatchFileService, confirm_service_1.ConfirmService, window_service_1.WindowService])
                ], BatchFileListComponent);
                return BatchFileListComponent;
            }());
            exports_1("BatchFileListComponent", BatchFileListComponent);
        }
    }
});
//# sourceMappingURL=batchfile-list.component.js.map