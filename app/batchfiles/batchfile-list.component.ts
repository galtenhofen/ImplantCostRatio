import {IBatchFile} from './batchfile';
import {IResponse} from './response';
import {IUpdate} from './update';
import {IOutbound} from './outbound';
import {ILoadInfo} from './loadInfo';
import {Component, OnInit, bind} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {UtilityListComponent} from '../utilities/utility-list.component';
import {BatchFileService} from './batchfile.service';
import {ConfirmService} from '../shared/confirm/confirm.service';
import {ConfirmComponent} from '../shared/confirm/confirm.component';
import {ErrorService} from '../shared/error/error.service';
import {ErrorComponent} from '../shared/error/error.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import { WindowService } from "../windowservice/window.service";


declare var componentHandler:any;

@Component({
templateUrl: 'app/batchfiles/batchfile-list.component.html',
styleUrls: ['app/batchfiles/batchfile-list.component.css', 'app/shared/confirm/confirm.component.css' , 'app/shared/error/error.component.css'],
directives: [UtilityListComponent, ConfirmComponent, ErrorComponent, ROUTER_DIRECTIVES],
providers: [ConfirmService, ErrorService, WindowService]

})



export class BatchFileListComponent
                implements OnInit{
    pageTitle: string = 'Implant Cost Ratio';
    errorMessage: string;
    httpStatus: string;
    batchId: string;
    providerId: string;
    dataFileGroupId: string;
    userName: string;
    caseNumber: string;
    overrideCostUpdates: string;
    
    postUpdates: string;
    updateList: any[] = [];
    
    newVarCostUpdates: IUpdate[] = [];
    updateObjects: IUpdate[] = [];
    update: IUpdate;

    outbound: IOutbound;

    batchfileResponse: IResponse;
    batchfiles: IBatchFile[];

    confirmResponse:string = '';
    loading: boolean = false;
    override: boolean = false;
    attempt: boolean;
    updating: boolean = false;
    updatingError: boolean = false;

constructor(private _batchfileService: BatchFileService, private _confirmService:ConfirmService, private _errorService:ErrorService, private windowService: WindowService){
    this.loading = this._batchfileService.loading;

}


    ngOnInit(): any{
        console.log('IN  OnInit');
        componentHandler.upgradeDom();

        console.log('Retrieving Batch Files...');
        this.loading=false;
        this.attempt=false;
        this.updating=false;
        this.overrideCostUpdates = "0";

    }


    reinitialize(): void{
            this.loading=false;
            this.attempt=false;
            this.updating=false;
            this.canEnableButtons();
            this.overrideCostUpdates = "0";
            this.batchfiles = [];
            this.updateObjects = [];
            this.dataFileGroupId = "";
            this.confirmResponse = "";
            this.errorMessage = "";

        }

    onUpdateDataFileGroupId(updateDFG): void{
        console.log('Entering onUpdateDataFileGroupId this.dataFileGroupId: ' + updateDFG);
        this.dataFileGroupId = updateDFG;
        }


 showConfirmDialog() {
        console.log('IN showConfirmDialog');
        var stringMessage:string;
        var stringTitle:string;
            stringMessage = "Are you sure you want to submit cost updates?";
            stringTitle = "Cost Updates"; 
            
            this._confirmService.activate(stringMessage, stringTitle)
        .then(res => this.completeRequest(stringTitle, res));

    }

 showErrorDialog(errMsg) {
     console.log('IN showErrorDialog');
     var stringMessage:string;
     var stringTitle:string;
        stringMessage = "Web Service Error";
        stringTitle = errMsg;     
        this._errorService.activate(stringMessage, stringTitle)
       .then(res => this.completeRequest(stringTitle, res));

   }

   completeRequest(strTitle, boolConfirm) {
            console.log('IN completeRequest   boolConfirm:  ' + boolConfirm);
            if(boolConfirm){
                            this.updating = true;
                            this._batchfileService.postUpdates(this.dataFileGroupId, this.overrideCostUpdates ,this.newVarCostUpdates)
                            .subscribe(
                            data => this.postUpdates = JSON.stringify(data), 
                            //error => this.errorMessage = this.showErrorDialog(this.errorMessage),
                            //error => this.errorMessage = <any>error,
                            error => this.onRequestComplete("submit", error),
                            () => this.onRequestComplete("submit", 200));
        
                    }
                    else{
                        console.log('Requested cancelled by user');
                        this.reinitialize();
                }
        }
/*
        handleError(strTitle, boolConfirm) {
            console.log('IN completeRequest   boolConfirm:  ' + boolConfirm);
            if(boolConfirm){
                            this.updating = true;

                            this._batchfileService.postUpdates(this.dataFileGroupId, this.overrideCostUpdates ,this.newVarCostUpdates)
                            .subscribe(
                            data => this.postUpdates = JSON.stringify(data), 
                            //error => this.errorMessage = this.showErrorDialog(this.errorMessage),
                            //error => this.errorMessage = <any>error,
                            error => this.onRequestComplete(error),
                            () => this.onRequestComplete("submit"));


                    }
                    else{console.log('Requested cancelled by user');}
        }
*/

    generateURL(batchId): void{
            console.log('Entering generateURL     batchId: ' + batchId);

            //window.open("https://www.google.com/");
            window.open("http://devanalytics.medassets.com/MicroStrategy/servlet/mstrWeb?Server=scs41vdmapapp01&Project=Navigator&Port=0&evt=2048001&src=mstrWeb.2048001&currentViewMedia=2&uid=navigatoruser&pwd=tibco123&visMode=0&documentID=8D2FB75441655878AC5265BA30F472F0&hiddensections=header,path,dockLeft,footer&elementsPromptAnswers=463DAA084A1B77DDD437D98C59F55BED;463DAA084A1B77DDD437D98C59F55BED:" + this.dataFileGroupId + ",D15CB49A4413A7C904706C92DFEE7641;D15CB49A4413A7C904706C92DFEE7641:" + batchId);

            }

    onClickrefreshBatchList(): void{
            this.attempt= true;
            this.disableButtons();
            this.errorMessage = "";
            this.updating = false;
            
                if (this.dataFileGroupId && this.dataFileGroupId != null && this.dataFileGroupId!=""){
                this.batchfiles = [];
                this.loading = true;

                    this._batchfileService.getBatchFiles(this.dataFileGroupId)
                    .subscribe(
                        batchfiles => this.batchfiles = batchfiles,
                        //error => this.errorMessage = <any>error,
                        error => this.onRequestComplete("get", error),
                        () => this.onRequestComplete("get", "200"));
                }
                else{
                    alert('Please Enter a DataFileGroupId to in order to fetch files');
            
                }

            console.log('Leaving onClickrefreshBatchList this.loading: ' + this.loading);
            }

     onToggleUpdate(avgImpCharge, encounterGroupType, updated): void{
            console.log('Update button clicked.  BatchId: ' + encounterGroupType + '  Current value = ' + updated);
            
                this.update = {"avgImplantCharge": avgImpCharge, "encounterGroupType": encounterGroupType, "targetAvgImplantVariableCost": null, "updated": updated  };

                //if the encounterGroupType id exists, remove current value first


                    for(var i = 0; i <  this.updateObjects.length; i++) {
                            if( this.updateObjects[i].encounterGroupType == encounterGroupType) {
                                this.updateObjects.splice(i, 1);
                                break;
                                }
                    }


                    if(updated== true){
                    //then add it in if updated = true
                    this.updateObjects.push(this.update);
                
                    }


                console.log('updateObj: ' + this.updateObjects);
                console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
                console.log('batchFiles length: ' + this.batchfiles.length);

                this.canEnableButtons();    
    }

    onUpdateVarCost(avgImpCharge,encounterGroupType, varCost): void{
            console.log('VarCost Updated.  BatchId: ' + encounterGroupType + '  Current value = ' + varCost);
            if (varCost != null && varCost != "" && varCost>=1){
                this.update = {"avgImplantCharge": avgImpCharge, "encounterGroupType": encounterGroupType, "targetAvgImplantVariableCost": varCost, updated: false  };

                //if this batchid is already in the updated array, need to delete it before adding new value
                if(varCost != "" && varCost != null){
                    
                    for(var i = 0; i <  this.updateObjects.length; i++) {
                        if( this.updateObjects[i].encounterGroupType == encounterGroupType) {
                            this.updateObjects.splice(i, 1);
                            break;
                            }
                    }

                this.updateObjects.push(this.update);

                    console.log('retryObj: ' + this.updateObjects);
                    console.log('stringify retryObj: ' + JSON.stringify(this.updateObjects));
                }
                else{

                    for(var i = 0; i <  this.updateObjects.length; i++) {
                        if( this.updateObjects[i].encounterGroupType == encounterGroupType) {
                            this.updateObjects.splice(i, 1);
                            break;
                            }
                }
            
                console.log('stringify updateObj: ' + JSON.stringify(this.updateObjects));
                }
                console.log('updateObjects length: ' + this.updateObjects.length);
                console.log('batchFiles length: ' + this.batchfiles.length);
            
                }
                else{
                    alert("Value must be a number greater or equal to one.");
                    var targetCell = "updateVarCost"+encounterGroupType;
                    (<HTMLInputElement> document.getElementById(targetCell)).value = "";

                    for(var i = 0; i <  this.updateObjects.length; i++) {
                        if( this.updateObjects[i].encounterGroupType == encounterGroupType) {
                            this.updateObjects.splice(i, 1);
                            break;
                            }
                    }
            
            }

            this.canEnableButtons(); 
        }


    onClickSubmit(): void{
            console.log('IN onClickSubmit  ');
            console.log('this.updateObjects: ' + this.updateObjects);
            console.log('filtered updateObjects: ' + this.updateObjects.filter(update => update.targetAvgImplantVariableCost != null));

            this.newVarCostUpdates = this.updateObjects.filter(update => update.targetAvgImplantVariableCost != null);
            console.log('stringify updateObjects: ' + JSON.stringify(this.newVarCostUpdates));
        this.showConfirmDialog(); 
        }

    onClickCancel(): void{
                console.log('IN onClickCancel  ');
            }

 
    toggleOverride(override): void{
            console.log('Override: ' + override);
            this.overrideCostUpdates = override;
        }

    onRequestComplete(action, result){
            console.log('ENTERING onRequestComplete  Action Performed: ' + action + '  Result: ' + result);
                if(action == "get"){
                    if(result == "200")
                        {
                            this.loading = this._batchfileService.loading;
                            this.canEnableButtons();
                        }
                     else{
                            console.log("ERROR BRO");
                            this.errorMessage = result;
                            this.loading = false;
                            this.showErrorDialog(result);
                     }   

                    }
                else if(action == "submit"){
                    if(result == "200")
                        {
                            this.updating = false;
                            console.log("SUCCESS");
                            this.reinitialize();
                        }
                    else{
  //Timeout to ensure errorDialog reappears                          
                            setTimeout(() => 
                            {
                                console.log("ERROR BRO");
                                this.errorMessage = result;
                                this.showErrorDialog(result);
                                this.updating = false;
                            },
                            1000);
                    }

                }
               
        console.log('LEAVING onRequestComplete');
        }

    initializeData(){
            console.log('ENTERING  intializeData');
                this.batchId = this.batchfileResponse.encounterGroupType;
                this.providerId = this.batchfileResponse.providerId;
                this.userName = this.batchfileResponse.userName;
                this.caseNumber = this.batchfileResponse.caseNumber;
                this.batchfiles = this.batchfileResponse.record;
            console.log('LEAVING  intializeData');

        }

    canEnableButtons(){
            console.log('ENTERING   canEnableButtons');
            if(this.batchfiles){    
                if(this.batchfiles.length - this.updateObjects.length > 0 ){
                    (<HTMLInputElement> document.getElementById('submitBtn')).disabled = true;
                }
                else{
                    (<HTMLInputElement> document.getElementById('submitBtn')).disabled = false;
                }
            }
            else{
                console.log('IN   canEnableButtons   this.batchfiles DOES NOT YET EXIST');
            }

            console.log('LEAVING   canEnableButtons');
        }

    disableButtons(){
            (<HTMLInputElement> document.getElementById('submitBtn')).disabled = true;
        // (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = true;
    
        }

    enableButtons(){
        
            (<HTMLInputElement> document.getElementById('submitBtn')).disabled = false;
        // (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = false;

        }


    makeTableScroll() {
                var maxRows = 10;

                var table: any = (<HTMLInputElement>document.getElementById('batchFilesTable')).value;
                var wrapper: any = (<HTMLInputElement>document.getElementById('batchFilesTable')).parentNode;
                //var wrapper = table.parentNode;
                var rowsInTable = table.rows.length;
                var height = 0;
                if (rowsInTable > maxRows) {
                    for (var i = 0; i < maxRows; i++) {
                        height += table.rows[i].clientHeight;
                    }
                    wrapper.style.height = height + "px";
                }
            }

}
