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
                    console.log('IN  OnInit');
                    componentHandler.upgradeDom();
                    console.log('Retrieving Batch Files...');
                    this.loading = false;
                    this.attempt = false;
                    this.overrideCostUpdates = "0";
                };
                BatchFileListComponent.prototype.reinitialize = function () {
                    this.loading = false;
                    this.attempt = false;
                    this.canEnableButtons();
                    this.overrideCostUpdates = "0";
                    this.batchfiles = [];
                    this.updateObjects = [];
                    this.dataFileGroupId = "";
                    this.confirmResponse = "";
                    this.errorMessage = "";
                };
                BatchFileListComponent.prototype.onUpdateDataFileGroupId = function (updateDFG) {
                    console.log('Entering onUpdateDataFileGroupId this.dataFileGroupId: ' + updateDFG);
                    this.dataFileGroupId = updateDFG;
                };
                BatchFileListComponent.prototype.showConfirmDialog = function () {
                    var _this = this;
                    console.log('IN showConfirmDialog');
                    var stringMessage;
                    var stringTitle;
                    stringMessage = "Are you sure you want to submit cost updates?";
                    stringTitle = "Cost Updates";
                    this._confirmService.activate(stringMessage, stringTitle)
                        .then(function (res) { return _this.completeRequest(stringTitle, res); });
                };
                /*
                 showErrorDialog(errMsg) {
                     console.log('IN showErrorDialog');
                     var stringMessage:string;
                     var stringTitle:string;
                        stringMessage = errMsg;
                        stringTitle = "Oh shit";
                        this._errorService.activate(stringMessage, stringTitle)
                       .then(res => this.completeRequest(stringTitle, res));
                
                   }*/
                BatchFileListComponent.prototype.completeRequest = function (strTitle, boolConfirm) {
                    var _this = this;
                    console.log('IN completeRequest   boolConfirm:  ' + boolConfirm);
                    if (boolConfirm) {
                        this._batchfileService.postUpdates(this.dataFileGroupId, this.overrideCostUpdates, this.newVarCostUpdates)
                            .subscribe(function (data) { return _this.postUpdates = JSON.stringify(data); }, 
                        //error => this.errorMessage = this.showErrorDialog(this.errorMessage),
                        function (error) { return _this.errorMessage = error; }, function () { return _this.onRequestComplete("submit"); });
                    }
                    else {
                        console.log('Requested cancelled by user');
                    }
                };
                BatchFileListComponent.prototype.generateURL = function (batchId) {
                    console.log('Entering generateURL     batchId: ' + batchId);
                    //window.open("https://www.google.com/");
                    window.open("http://devanalytics.medassets.com/MicroStrategy/servlet/mstrWeb?Server=scs41vdmapapp01&Project=Navigator&Port=0&evt=2048001&src=mstrWeb.2048001&currentViewMedia=2&uid=navigatoruser&pwd=tibco123&visMode=0&documentID=8D2FB75441655878AC5265BA30F472F0&hiddensections=header,path,dockLeft,footer&elementsPromptAnswers=463DAA084A1B77DDD437D98C59F55BED;463DAA084A1B77DDD437D98C59F55BED:" + this.dataFileGroupId + ",D15CB49A4413A7C904706C92DFEE7641;D15CB49A4413A7C904706C92DFEE7641:" + batchId);
                };
                BatchFileListComponent.prototype.onClickrefreshBatchList = function () {
                    var _this = this;
                    this.attempt = true;
                    this.disableButtons();
                    if (this.dataFileGroupId && this.dataFileGroupId != null && this.dataFileGroupId != "") {
                        this.batchfiles = [];
                        this.loading = true;
                        this._batchfileService.getBatchFiles(this.dataFileGroupId)
                            .subscribe(function (batchfiles) { return _this.batchfiles = batchfiles; }, function (error) { return _this.errorMessage = error; }, function () { return _this.onRequestComplete("get"); });
                    }
                    else {
                        alert('Please Enter a DataFileGroupId to in order to fetch files');
                    }
                    console.log('Leaving onClickrefreshBatchList this.loading: ' + this.loading);
                };
                BatchFileListComponent.prototype.onToggleUpdate = function (avgImpCharge, encounterGroupType, updated) {
                    console.log('Update button clicked.  BatchId: ' + encounterGroupType + '  Current value = ' + updated);
                    this.update = { "avgImplantCharge": avgImpCharge, "encounterGroupType": encounterGroupType, "targetAvgImplantVariableCost": null, "updated": updated };
                    //if the encounterGroupType id exists, remove current value first
                    for (var i = 0; i < this.updateObjects.length; i++) {
                        if (this.updateObjects[i].encounterGroupType == encounterGroupType) {
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
                    this.canEnableButtons();
                };
                BatchFileListComponent.prototype.onUpdateVarCost = function (avgImpCharge, encounterGroupType, varCost) {
                    console.log('VarCost Updated.  BatchId: ' + encounterGroupType + '  Current value = ' + varCost);
                    if (varCost != null && varCost != "" && varCost >= 1) {
                        this.update = { "avgImplantCharge": avgImpCharge, "encounterGroupType": encounterGroupType, "targetAvgImplantVariableCost": varCost, updated: false };
                        //if this batchid is already in the updated array, need to delete it before adding new value
                        if (varCost != "" && varCost != null) {
                            for (var i = 0; i < this.updateObjects.length; i++) {
                                if (this.updateObjects[i].encounterGroupType == encounterGroupType) {
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
                                if (this.updateObjects[i].encounterGroupType == encounterGroupType) {
                                    this.updateObjects.splice(i, 1);
                                    break;
                                }
                            }
                            console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
                        }
                        console.log('updateObjects length: ' + this.updateObjects.length);
                        console.log('batchFiles length: ' + this.batchfiles.length);
                    }
                    else {
                        alert("Value must be a number greater or equal to one.");
                        var targetCell = "updateVarCost" + encounterGroupType;
                        document.getElementById(targetCell).value = "";
                        for (var i = 0; i < this.updateObjects.length; i++) {
                            if (this.updateObjects[i].encounterGroupType == encounterGroupType) {
                                this.updateObjects.splice(i, 1);
                                break;
                            }
                        }
                    }
                    this.canEnableButtons();
                };
                BatchFileListComponent.prototype.onClickSubmit = function () {
                    console.log('IN onClickSubmit  ');
                    console.log('this.updateObjects: ' + this.updateObjects);
                    console.log('filtered updateObjects: ' + this.updateObjects.filter(function (update) { return update.targetAvgImplantVariableCost != null; }));
                    this.newVarCostUpdates = this.updateObjects.filter(function (update) { return update.targetAvgImplantVariableCost != null; });
                    console.log('stringify updateObjects: ' + JSON.stringify(this.newVarCostUpdates));
                    this.showConfirmDialog();
                };
                BatchFileListComponent.prototype.onClickCancel = function () {
                    console.log('IN onClickCancel  ');
                };
                BatchFileListComponent.prototype.toggleOverride = function (override) {
                    console.log('Override: ' + override);
                    this.overrideCostUpdates = override;
                };
                BatchFileListComponent.prototype.onRequestComplete = function (action) {
                    console.log('ENTERING onRequestComplete  Action Performed: ' + action);
                    if (action == "get") {
                        this.loading = this._batchfileService.loading;
                        this.canEnableButtons();
                    }
                    else if (action == "submit") {
                        console.log('ENTERING onRequestComplete  Server Response: ' + this.postUpdates);
                        if (this.postUpdates == "200") {
                            console.log("SUCCESS");
                            this.reinitialize();
                        }
                        else {
                            console.log("ERROR BRO");
                        }
                    }
                    console.log('LEAVING onRequestComplete');
                };
                BatchFileListComponent.prototype.initializeData = function () {
                    console.log('ENTERING  intializeData');
                    this.batchId = this.batchfileResponse.encounterGroupType;
                    this.providerId = this.batchfileResponse.providerId;
                    this.userName = this.batchfileResponse.userName;
                    this.caseNumber = this.batchfileResponse.caseNumber;
                    this.batchfiles = this.batchfileResponse.record;
                    console.log('LEAVING  intializeData');
                };
                BatchFileListComponent.prototype.canEnableButtons = function () {
                    console.log('ENTERING   canEnableButtons');
                    if (this.batchfiles) {
                        if (this.batchfiles.length - this.updateObjects.length > 0) {
                            document.getElementById('submitBtn').disabled = true;
                        }
                        else {
                            document.getElementById('submitBtn').disabled = false;
                        }
                    }
                    else {
                        console.log('IN   canEnableButtons   this.batchfiles DOES NOT YET EXIST');
                    }
                    console.log('LEAVING   canEnableButtons');
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