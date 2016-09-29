import { Component } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';

@Component({
    templateUrl: 'app/orfiledetail/orfile-detail.component.html'
})
export class ORFileDetailComponent  {
    pageTitle: string = 'OR File Detail';
    
    constructor(private _routeParams: RouteParams,
                private _router: Router) {
          let id = this._routeParams.get('id');
          this.pageTitle += `: ${id}`;
    }

    onBack(): void {
        this._router.navigate(['ORFiles']);
    }

}
