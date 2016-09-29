
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';  //Load all features
import {bootstrap} from 'angular2/platform/browser';
import {BatchFileListComponent} from './batchfiles/batchfile-list.component';
import {BatchFileService} from './batchfiles/batchfile.service';
import {ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {BatchFileDetailComponent} from './batchfiledetail/batchfile-detail.component';
import { WindowService } from './windowservice/window.service';

@Component({
    selector: 'icr-app',
    template: `<div><h1> {{pageTitle}} </h1>
    <router-outlet></router-outlet>
    </div>`,
    directives: [BatchFileListComponent, ROUTER_DIRECTIVES],
    providers:  [BatchFileService, HTTP_PROVIDERS, ROUTER_PROVIDERS]
})


@RouteConfig([
    { path: '/batchfiles', name: 'BatchFiles', component: BatchFileListComponent, useAsDefault: true},
    { path: '/batchDetail/:id', name: 'BatchDetail', component: BatchFileDetailComponent}
])

export class AppComponent{
    pageTitle: string = 'Implant Cost Ratio'
}

bootstrap(AppComponent, [WindowService]);
