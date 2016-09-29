import {IBatchFile} from './batchfile';
import {IResponse} from './response';
import {IUpdate} from './update';
import {ILoadInfo} from './loadInfo';
import {Component, OnInit, bind} from 'angular2/core';
//import {ProviderIdFilterPipe} from './orfile-providerIdfilter.pipe';
//import {FileTypeFilterPipe} from './orfile-fileTypefilter.pipe';
//import {SubsystemFilterPipe} from './orfile-subsystemfilter.pipe';
//import {ORFileFilterPipe} from './orfile-orfilefilter.pipe';
import {bootstrap} from 'angular2/platform/browser';
import {UtilityListComponent} from '../utilities/utility-list.component';
import {BatchFileService} from './batchfile.service';
import {ConfirmService} from '../shared/confirm/confirm.service';
import {ConfirmComponent} from '../shared/confirm/confirm.component';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import { WindowService } from "../windowservice/window.service";


declare var componentHandler:any;

@Component({
templateUrl: 'app/batchfiles/batchfile-list.component.html',
styleUrls: ['app/batchfiles/batchfile-list.component.css', 'app/shared/confirm/confirm.component.css'],
//pipes:([ProviderIdFilterPipe],[FileTypeFilterPipe],[SubsystemFilterPipe],[ORFileFilterPipe]),
directives: [UtilityListComponent, ConfirmComponent, ROUTER_DIRECTIVES],
providers: [ConfirmService,  WindowService]

})



export class BatchFileListComponent
                implements OnInit{
    pageTitle: string = 'Implant Cost Ratio';
    errorMessage: string;
    httpStatus: string;
    beginDate: string;
    endDate: string;
    currentORFileGroupId: string;
    
    updateList: any[] = [];
    //utilityList: any[] = [];
    postUpdates: string;
    postRetries: string;
    
    newVarCostUpdates: IUpdate[] = [];
    updateObjects: IUpdate[] = [];
    update: IUpdate;

    response: IResponse;
    batchfiles: IBatchFile[];

    confirmResponse:string = '';
    loading: boolean = false;
    override: boolean = false;

constructor(private _batchfileService: BatchFileService, private _confirmService:ConfirmService, private windowService: WindowService){
    this.loading = this._batchfileService.loading;

}


    ngOnInit(): any{
    console.log('IN  OnInit');
     
     componentHandler.upgradeDom();

    console.log('Retrieving Batch Files...');
    this.loading=true;
/*  ORIGINAL - for use without top level DATA in json response

     this._batchfileService.getBatchFiles()
                .subscribe(
                    batchfiles => this.batchfiles = batchfiles,
                    error => this.errorMessage = <any>error,
                    () => this.onRequestComplete());
*/

 this._batchfileService.getBatchFiles()
                .subscribe(
                    response => this.batchfiles = response.record,
                    error => this.errorMessage = <any>error,
                    () => this.onRequestComplete());
    }
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

    onClickrefreshBatchList(): void{
        this.disableButtons();
        //var run:boolean = this.validateReceivedDates(this.beginDate, this.endDate);
        //if (run == true){
            this.batchfiles = [];
            this.loading = true;
          this._batchfileService.getBatchFiles()
                .subscribe(
                    batchfiles => this.batchfiles = batchfiles,
                    error => this.errorMessage = <any>error,
                    //() => (this.loading = this._orfileService.loading));
                    () => (this.onRequestComplete()));
       // }
       // else{
        //    alert('You entered a begin date ('+this.beginDate+') that is after the end date ('+this.endDate+ ') and that makes no sense.');
        //    console.log('You fucked up the dates');
       // }

    console.log('Leaving onClickrefreshBatchList this.loading: ' + this.loading);
    }

     onToggleUpdate(jsxid, updated): void{
        console.log('Update button clicked.  BatchId: ' + jsxid + '  Current value = ' + updated);
        
       this.update = {"batchId": jsxid, "newVarCost": null, "updated": updated  };

//if the jsxid id exists, remove current value first


for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].batchId == jsxid) {
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
    }

    onUpdateVarCost(jsxid, varCost): void{
        console.log('VarCost Updated.  BatchId: ' + jsxid + '  Current value = ' + varCost);
     if (varCost != null && varCost != "" && varCost>=1){
       this.update = {"batchId": jsxid, "newVarCost": varCost, updated: false  };

//if this batchid is already in the updated array, need to delete it before adding new value
        if(varCost != "" && varCost != null){
            
            for(var i = 0; i <  this.updateObjects.length; i++) {
                if( this.updateObjects[i].batchId == jsxid) {
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
                if( this.updateObjects[i].batchId == jsxid) {
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
        else{
            alert("Value must be a number greater or equal to one.");
            var targetCell = "updateVarCost"+jsxid;
            (<HTMLInputElement> document.getElementById(targetCell)).value = "";
           
        }
    }


    onClickSubmit(): void{
        console.log('IN onClickSubmit  ');
        console.log('this.updateObjects: ' + this.updateObjects);
        console.log('filtered updateObjects: ' + this.updateObjects.filter(update => update.newVarCost != null));

        this.newVarCostUpdates = this.updateObjects.filter(update => update.newVarCost != null);

        console.log('stringify updateObjects: ' + JSON.stringify(this.newVarCostUpdates));
        
        this._batchfileService.postUpdates(this.newVarCostUpdates)
                .subscribe(
                    data => this.postUpdates = JSON.stringify(data), 
                    error => this.errorMessage = <any>error);
    }


    onClickClose(): void{
        console.log('Close App');
        if(confirm('You wanna close the app?')){
            alert("This app took me a long time to develop, so you're gonna sit there and use it some more.");
        }
        
    }

 
    onChangeOverride(override): void{
        console.log('Override: ' + override);
       // this.beginDate = selectedDate.toString();
       // console.log('Begin Date: ' + this.beginDate);
       // var beginString: string = ((this.beginDate).getFullYear()).toString() + "/" + ((this.beginDate).getMonth()).toString() + "/" + ((this.beginDate).getDay()).toString();
        //console.log('beginString: ' + beginString);
        this.override = override;
    }

    showOrFileDetail(){
        console.log('IN  showOrFileDetail');
    }

    onRequestComplete(){
    this.loading = this._batchfileService.loading;
    this.canEnableButtons();
    //this.enableButtons();
    }

    canEnableButtons(){
    if(this.batchfiles.length - this.updateObjects.length > 0 ){
            (<HTMLInputElement> document.getElementById('submitBtn')).disabled = true;
        }
        else{
            (<HTMLInputElement> document.getElementById('submitBtn')).disabled = false;
        }
    /* if(!this.utilityObjects || this.utilityObjects.length < 1 ){
            (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = true;
        }
        else{
            (<HTMLInputElement> document.getElementById('utilityBtn')).disabled = false;
        }   */ 
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
