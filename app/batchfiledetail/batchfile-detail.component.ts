import { Component } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';

@Component({
    templateUrl: 'app/batchfiledetail/batchfile-detail.component.html'
})
export class BatchFileDetailComponent  {
    pageTitle: string = 'Batch File Detail';
    
    constructor(private _routeParams: RouteParams,
                private _router: Router) {
          let id = this._routeParams.get('jsxid');
          this.pageTitle += `: ${id}`;
    }

    onBack(): void {
        this._router.navigate(['BatchFiles']);
    }

}
