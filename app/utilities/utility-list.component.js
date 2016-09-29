System.register(['angular2/core', './utility'], function(exports_1, context_1) {
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
    var core_1, utility_1;
    var UtilityListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (utility_1_1) {
                utility_1 = utility_1_1;
            }],
        execute: function() {
            UtilityListComponent = (function () {
                function UtilityListComponent() {
                    this.utilitySelected = new core_1.EventEmitter();
                    this.selectedUtility = new utility_1.Utility(0, '');
                    this.utilities = [
                        new utility_1.Utility(1, ''),
                        new utility_1.Utility(2, 'Unconvert'),
                        new utility_1.Utility(3, 'Purge ORDataFileGroupId'),
                    ];
                }
                UtilityListComponent.prototype.ngOnChanges = function () {
                    console.log('IN ngOnChanges');
                };
                UtilityListComponent.prototype.onSelectUtility = function (selectedId) {
                    console.log('IN onSelectUtility ');
                    console.log('IN onSelectUtility  Data Utility ID: ' + selectedId);
                    this.utilitySelected.emit(selectedId);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], UtilityListComponent.prototype, "utilityId", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], UtilityListComponent.prototype, "utilityName", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', core_1.EventEmitter)
                ], UtilityListComponent.prototype, "utilitySelected", void 0);
                UtilityListComponent = __decorate([
                    core_1.Component({
                        selector: 'orw-utility-list',
                        templateUrl: 'app/utilities/utility-list.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], UtilityListComponent);
                return UtilityListComponent;
            }());
            exports_1("UtilityListComponent", UtilityListComponent);
        }
    }
});
//# sourceMappingURL=utility-list.component.js.map