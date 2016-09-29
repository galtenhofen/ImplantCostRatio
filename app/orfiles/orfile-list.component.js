System.register(['angular2/core', './orfile-providerIdfilter.pipe', './orfile-fileTypefilter.pipe', './orfile-subsystemfilter.pipe', './orfile-orfilefilter.pipe', '../utilities/utility-list.component', './orfile.service', '../shared/confirm/confirm.service', '../shared/confirm/confirm.component', 'angular2/router', "../windowservice/window.service"], function(exports_1, context_1) {
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
    var core_1, orfile_providerIdfilter_pipe_1, orfile_fileTypefilter_pipe_1, orfile_subsystemfilter_pipe_1, orfile_orfilefilter_pipe_1, utility_list_component_1, orfile_service_1, confirm_service_1, confirm_component_1, router_1, window_service_1;
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
            },
            function (utility_list_component_1_1) {
                utility_list_component_1 = utility_list_component_1_1;
            },
            function (orfile_service_1_1) {
                orfile_service_1 = orfile_service_1_1;
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
            ORFileListComponent = (function () {
                function ORFileListComponent(_orfileService, _confirmService, windowService) {
                    this._orfileService = _orfileService;
                    this._confirmService = _confirmService;
                    this.windowService = windowService;
                    this.pageTitle = 'OR Status';
                    this.providerFilter = '';
                    this.fileTypeFilter = '';
                    this.subsystemFilter = '';
                    this.statusFilter = '';
                    this.retryList = [];
                    this.utilityList = [];
                    this.utilityObjects = [];
                    this.retryObjects = [];
                    this.confirmResponse = '';
                    this.loading = false;
                    this.loading = this._orfileService.loading;
                }
                ORFileListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log('IN  OnInit');
                    componentHandler.upgradeDom();
                    this.beginDate = this.formatDate(new Date());
                    this.endDate = this.formatDate(new Date());
                    console.log('Retrieving OR Files...');
                    this.loading = true;
                    this._orfileService.getORFilesByDate(this.beginDate, this.endDate)
                        .subscribe(function (orfiles) { return _this.orfiles = orfiles; }, function (error) { return _this.errorMessage = error; }, function () { return _this.onRequestComplete(); });
                };
                ORFileListComponent.prototype.showConfirmDialog = function (stringTitle) {
                    var _this = this;
                    console.log('IN showConfirmDialog  action: ' + stringTitle);
                    var stringMessage;
                    if (stringTitle === "DataUtilties") {
                        stringMessage = "Are you sure you want to run selected Data Utilities?";
                    }
                    if (stringTitle === "ReleaseRetry") {
                        stringMessage = "Are you sure you want to release selected Retry items?";
                    }
                    this._confirmService.activate(stringMessage, stringTitle)
                        .then(function (res) { return _this.completeRequest(stringTitle, res); });
                };
                ORFileListComponent.prototype.completeRequest = function (strTitle, boolConfirm) {
                    var _this = this;
                    if (boolConfirm) {
                        if (strTitle === "DataUtilities") {
                            this._orfileService.postRunUtilities(this.utilityObjects)
                                .subscribe(function (data) { return _this.postDataUtilities = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
                        }
                        if (strTitle === "ReleaseRetry") {
                            this._orfileService.postReleaseRetry(this.retryObjects)
                                .subscribe(function (data) { return _this.postRetries = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
                        }
                    }
                    else {
                        console.log('Requested cancelled by user');
                    }
                };
                ORFileListComponent.prototype.onClickrefreshORList = function () {
                    var _this = this;
                    this.disableButtons();
                    var run = this.validateReceivedDates(this.beginDate, this.endDate);
                    if (run == true) {
                        this.orfiles = [];
                        this.loading = true;
                        this._orfileService.getORFilesByDate(this.beginDate, this.endDate)
                            .subscribe(function (orfiles) { return _this.orfiles = orfiles; }, function (error) { return _this.errorMessage = error; }, 
                        //() => (this.loading = this._orfileService.loading));
                        function () { return (_this.onRequestComplete()); });
                    }
                    else {
                        alert('You entered a begin date (' + this.beginDate + ') that is after the end date (' + this.endDate + ') and that makes no sense.');
                        console.log('You fucked up the dates');
                    }
                    console.log('Leaving onClickrefreshORList  this.loading: ' + this.loading);
                };
                ORFileListComponent.prototype.onToggleRetry = function (ordfgId, checked, processStep, providerId) {
                    console.log('Retry button clicked.  ORDataFileGroupId: ' + ordfgId + '  Current value = ' + checked + '  Step: ' + processStep + '  ProviderId: ' + providerId);
                    this.retry = { "orDataFileGroupId": ordfgId, "providerId": providerId, "step": processStep, "userName": "galtenhofen" };
                    if (checked == true) {
                        this.retryObjects.push(this.retry);
                        console.log('retryObj: ' + this.retryObjects);
                        console.log('stringify retryObj: ' + JSON.stringify(this.retryObjects));
                    }
                    else {
                        for (var i = 0; i < this.retryObjects.length; i++) {
                            if (this.retryObjects[i].orDataFileGroupId == ordfgId) {
                                this.retryObjects.splice(i, 1);
                                break;
                            }
                        }
                        console.log('stringify retryObj: ' + JSON.stringify(this.retryObjects));
                    }
                    this.canEnableButtons();
                };
                /*  ORIGINAL
                
                    onToggleRetry(ordfgId, checked, processStep, providerId): void{
                        console.log('Retry button clicked.  ORDataFileGroupId: ' + ordfgId + '  Current value = ' + checked + '  Step: ' + processStep);
                        
                        if(checked == true){
                        this.retryList.push(ordfgId,processStep);
                        console.log('retryList: ' + this.retryList);
                        }
                        else{
                           var removeIndex = this.retryList.indexOf(ordfgId);
                           this.retryList.splice(removeIndex,2)
                           console.log('retryList: ' + this.retryList);
                        }
                    }*/
                ORFileListComponent.prototype.onClickReleaseRetry = function () {
                    var _this = this;
                    console.log('Release Retry Items');
                    console.log('utilityList: ' + this.utilityList);
                    if (this.utilityList.length < 0) {
                    }
                    else {
                        this._orfileService.postReleaseRetry(this.retryObjects)
                            .subscribe(function (data) { return _this.postRetries = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
                    }
                };
                ORFileListComponent.prototype.onClickRunDataUtilities = function () {
                    var _this = this;
                    console.log('IN onClickRunDataUtilties  ');
                    console.log('utilityList: ' + this.utilityList);
                    this._orfileService.postRunUtilities(this.utilityObjects)
                        .subscribe(function (data) { return _this.postDataUtilities = JSON.stringify(data); }, function (error) { return _this.errorMessage = error; });
                };
                ORFileListComponent.prototype.onClickClose = function () {
                    console.log('Close App');
                    if (confirm('You wanna close the app?')) {
                        alert("This app took me a long time to develop, so you're gonna sit there and use it some more.");
                    }
                };
                ORFileListComponent.prototype.onChangeDateReceivedFrom = function (selectedDate) {
                    console.log('Changed Date Received From.  Setting this.beginDate');
                    console.log('Selected Date: ' + selectedDate);
                    // this.beginDate = selectedDate.toString();
                    console.log('Begin Date: ' + this.beginDate);
                    // var beginString: string = ((this.beginDate).getFullYear()).toString() + "/" + ((this.beginDate).getMonth()).toString() + "/" + ((this.beginDate).getDay()).toString();
                    //console.log('beginString: ' + beginString);
                };
                ORFileListComponent.prototype.onChangeDateReceivedTo = function (selectedDate) {
                    console.log('Changed Date Received To');
                    //   this.endDate = selectedDate.toString();
                    //var endString: string = ((this.endDate).getFullYear()).toString() + "/" + ((this.endDate).getMonth()).toString() + "/" + ((this.endDate).getDay()).toString();        
                    console.log('End Date: ' + this.endDate);
                };
                /*
                  onUtilitySelected(message:string, ordfgId, providerId): void{
                         console.log('IN onUtilitySelected  orfile-list component ');
                         console.log('IN onUtilitySelected  message: ' + message);
                        console.log('IN onUtilitySelected  ORDataFileGroupId: ' + ordfgId + '  ProviderId: ' + providerId  );
                
                         if(message == '2' || message == '3'){
                
                            //var existIndex = this.utilityList.indexOf("orDataFileGroupId:"+ordfgId);
                            
                            console.log('IN onUtilitySelected  ORDataFileGroupId : '+ ordfgId + ' exists in arraty at position ' + existIndex);
                            
                            if(existIndex > -1){
                                this.utilityList.splice(existIndex,3)
                                console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                                }
                    
                                if(message == '2'){
                                    this.utilityList.push(ordfgId, providerId, "unconvert");
                                    //this.utilityList.push("orDataFileGroupId:"+ordfgId, "providerId:"+providerId, "type:unconvert");
                                }
                                else if(message == '3'){
                                    this.utilityList.push(ordfgId, providerId, "purgeAll");
                                   // this.utilityList.push("orDataFileGroupId:"+ordfgId, "providerId:"+providerId, "type:purgeAll");
                                }
                             console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                    
                        }
                        else{
                            var existIndex = this.utilityList.indexOf("orDataFileGroupId:"+ordfgId);
                            console.log('IN onUtilitySelected  ORDataFileGroupId : '+ ordfgId + ' exists in arraty at position ' + existIndex);
                            if(existIndex > -1){
                                this.utilityList.splice(existIndex,3)
                                console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                            }
                            else{
                            console.log('IN onUtilitySelected  NO UTILITY CHOSEN: ');
                            console.log('IN onUtilitySelected utilityList: ' + this.utilityList);
                            }
                        }
                    }*/
                ORFileListComponent.prototype.onUtilitySelected = function (message, ordfgId, providerId) {
                    console.log('IN onUtilitySelected  orfile-list component ');
                    console.log('IN onUtilitySelected  message: ' + message);
                    console.log('IN onUtilitySelected  ORDataFileGroupId: ' + ordfgId + '  ProviderId: ' + providerId);
                    var type;
                    if (message == '2') {
                        type = 'unconvert';
                    }
                    else if (message == '3') {
                        type = 'purgeAll';
                    }
                    else {
                        type = '';
                    }
                    this.utility = { "orDataFileGroupId": ordfgId, "providerId": providerId, "step": type, "userName": "galtenhofen" };
                    for (var i = 0; i < this.utilityObjects.length; i++) {
                        if (this.utilityObjects[i].orDataFileGroupId == ordfgId) {
                            this.utilityObjects.splice(i, 1);
                            break;
                        }
                    }
                    if (message == '2' || message == '3') {
                        this.utilityObjects.push(this.utility);
                        console.log('retryObj: ' + this.retryObjects);
                        console.log('stringify retryObj: ' + JSON.stringify(this.utilityObjects));
                    }
                    this.canEnableButtons();
                };
                ORFileListComponent.prototype.formatDate = function (dateToFormat) {
                    var dayNum = dateToFormat.getDate();
                    var monthNum = dateToFormat.getMonth();
                    var dayString;
                    var monthString;
                    if (dayNum < 10) {
                        dayString = '0' + dayNum.toString();
                    }
                    else {
                        dayString = dayNum.toString();
                    }
                    if (monthNum < 10) {
                        monthString = '0' + (monthNum + 1).toString();
                    }
                    else {
                        monthString = monthNum.toString();
                    }
                    console.log('IN  formatDate : ' + dateToFormat.getFullYear().toString() + "-" + monthString + "-" + dayString);
                    return (dateToFormat.getFullYear().toString() + "-" + monthString + "-" + dayString);
                };
                ORFileListComponent.prototype.validateReceivedDates = function (beginDate, endDate) {
                    console.log('IN  validateReceivedDates');
                    if (endDate < beginDate) {
                        return false;
                    }
                    else
                        return true;
                };
                ORFileListComponent.prototype.buildRunUtility = function (utilityList) {
                    var jsonData = {};
                };
                ORFileListComponent.prototype.containsObject = function (ordfgid) {
                    if (this.utilityList.filter(function (e) { return e.orDataFileGroupId == ordfgid; }).length > 0) {
                    }
                };
                ORFileListComponent.prototype.showOrFileDetail = function () {
                    console.log('IN  showOrFileDetail');
                };
                ORFileListComponent.prototype.onRequestComplete = function () {
                    this.loading = this._orfileService.loading;
                    this.canEnableButtons();
                    //this.enableButtons();
                };
                ORFileListComponent.prototype.canEnableButtons = function () {
                    if (!this.retryObjects || this.retryObjects.length < 1) {
                        document.getElementById('retryBtn').disabled = true;
                    }
                    else {
                        document.getElementById('retryBtn').disabled = false;
                    }
                    if (!this.utilityObjects || this.utilityObjects.length < 1) {
                        document.getElementById('utilityBtn').disabled = true;
                    }
                    else {
                        document.getElementById('utilityBtn').disabled = false;
                    }
                };
                ORFileListComponent.prototype.disableButtons = function () {
                    document.getElementById('retryBtn').disabled = true;
                    document.getElementById('utilityBtn').disabled = true;
                };
                ORFileListComponent.prototype.enableButtons = function () {
                    document.getElementById('retryBtn').disabled = false;
                    document.getElementById('utilityBtn').disabled = false;
                };
                ORFileListComponent.prototype.makeTableScroll = function () {
                    var maxRows = 10;
                    var table = document.getElementById('orFilesTable').value;
                    var wrapper = document.getElementById('orFilesTable').parentNode;
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
                ORFileListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/orfiles/orfile-list.component.html',
                        styleUrls: ['app/orfiles/orfile-list.component.css', 'app/shared/confirm/confirm.component.css'],
                        pipes: ([orfile_providerIdfilter_pipe_1.ProviderIdFilterPipe], [orfile_fileTypefilter_pipe_1.FileTypeFilterPipe], [orfile_subsystemfilter_pipe_1.SubsystemFilterPipe], [orfile_orfilefilter_pipe_1.ORFileFilterPipe]),
                        directives: [utility_list_component_1.UtilityListComponent, confirm_component_1.ConfirmComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [confirm_service_1.ConfirmService, window_service_1.WindowService]
                    }), 
                    __metadata('design:paramtypes', [orfile_service_1.ORFileService, confirm_service_1.ConfirmService, window_service_1.WindowService])
                ], ORFileListComponent);
                return ORFileListComponent;
            }());
            exports_1("ORFileListComponent", ORFileListComponent);
        }
    }
});
//# sourceMappingURL=orfile-list.component.js.map