import { Component, OnChanges, Input, Output, EventEmitter } from 'angular2/core';
import { Utility } from './utility';

@Component({
  selector: 'orw-utility-list',
  templateUrl: 'app/utilities/utility-list.component.html'
})
export class UtilityListComponent implements OnChanges {
  @Input() utilityId: number; 
  @Input() utilityName: string;
  
          
  @Output() utilitySelected: EventEmitter<string> =
                             new EventEmitter<string>();

  selectedUtility:Utility = new Utility(0, '');
  utilities = [
     new Utility(1, '' ),
     new Utility(2, 'Unconvert' ),
     new Utility(3, 'Purge ORDataFileGroupId' ),

  ];

  ngOnChanges(): void {
    console.log('IN ngOnChanges');
  }

   onSelectUtility(selectedId): void{
        console.log('IN onSelectUtility ');
        console.log('IN onSelectUtility  Data Utility ID: ' + selectedId);
        this.utilitySelected.emit(selectedId);
   
  }

}