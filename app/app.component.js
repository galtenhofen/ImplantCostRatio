System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', 'angular2/platform/browser', './batchfiles/batchfile-list.component', './batchfiles/batchfile.service', 'angular2/router', './batchfiledetail/batchfile-detail.component', './windowservice/window.service'], function(exports_1, context_1) {
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
    var core_1, http_1, browser_1, batchfile_list_component_1, batchfile_service_1, router_1, batchfile_detail_component_1, window_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (batchfile_list_component_1_1) {
                batchfile_list_component_1 = batchfile_list_component_1_1;
            },
            function (batchfile_service_1_1) {
                batchfile_service_1 = batchfile_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (batchfile_detail_component_1_1) {
                batchfile_detail_component_1 = batchfile_detail_component_1_1;
            },
            function (window_service_1_1) {
                window_service_1 = window_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.pageTitle = 'Implant Cost Ratio';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'icr-app',
                        template: "<div><h1> {{pageTitle}} </h1>\n    <router-outlet></router-outlet>\n    </div>",
                        directives: [batchfile_list_component_1.BatchFileListComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [batchfile_service_1.BatchFileService, http_1.HTTP_PROVIDERS, router_1.ROUTER_PROVIDERS]
                    }),
                    router_1.RouteConfig([
                        { path: '/batchfiles', name: 'BatchFiles', component: batchfile_list_component_1.BatchFileListComponent, useAsDefault: true },
                        { path: '/batchDetail/:id', name: 'BatchDetail', component: batchfile_detail_component_1.BatchFileDetailComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
            browser_1.bootstrap(AppComponent, [window_service_1.WindowService]);
        }
    }
});
//# sourceMappingURL=app.component.js.map