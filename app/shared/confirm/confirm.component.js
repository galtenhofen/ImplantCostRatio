System.register(['angular2/core', "./confirm.service"], function(exports_1, context_1) {
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
    var core_1, confirm_service_1;
    var KEY_ESC, ConfirmComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (confirm_service_1_1) {
                confirm_service_1 = confirm_service_1_1;
            }],
        execute: function() {
            KEY_ESC = 27;
            ConfirmComponent = (function () {
                function ConfirmComponent(confirmService) {
                    this._defaults = {
                        title: 'Confirmation',
                        message: 'Are you sure you want to release selected Data Utilities?',
                        cancelText: 'Cancel',
                        okText: 'OK'
                    };
                    confirmService.activate = this.activate.bind(this);
                }
                ConfirmComponent.prototype._setLabels = function (message, title) {
                    if (message === void 0) { message = this._defaults.message; }
                    if (title === void 0) { title = this._defaults.title; }
                    this.title = title;
                    this.message = message;
                    this.okText = this._defaults.okText;
                    this.cancelText = this._defaults.cancelText;
                };
                ConfirmComponent.prototype.activate = function (message, title) {
                    var _this = this;
                    if (message === void 0) { message = this._defaults.message; }
                    if (title === void 0) { title = this._defaults.title; }
                    this._setLabels(message, title);
                    var promise = new Promise(function (resolve) {
                        _this._show(resolve);
                    });
                    return promise;
                };
                ConfirmComponent.prototype._show = function (resolve) {
                    var _this = this;
                    document.onkeyup = null;
                    var negativeOnClick = function (e) { return resolve(false); };
                    var positiveOnClick = function (e) { return resolve(true); };
                    if (!this._confirmElement || !this._cancelButton || !this._okButton)
                        return;
                    this._confirmElement.style.opacity = 0;
                    this._confirmElement.style.zIndex = 9999;
                    this._cancelButton.onclick = (function (e) {
                        e.preventDefault();
                        if (!negativeOnClick(e))
                            _this._hideDialog();
                    });
                    this._okButton.onclick = (function (e) {
                        e.preventDefault();
                        if (!positiveOnClick(e))
                            _this._hideDialog();
                    });
                    this._confirmElement.onclick = function () {
                        _this._hideDialog();
                        return negativeOnClick(null);
                    };
                    document.onkeyup = function (e) {
                        if (e.which == KEY_ESC) {
                            _this._hideDialog();
                            return negativeOnClick(null);
                        }
                    };
                    this._confirmElement.style.opacity = 1;
                };
                ConfirmComponent.prototype._hideDialog = function () {
                    var _this = this;
                    document.onkeyup = null;
                    this._confirmElement.style.opacity = 0;
                    window.setTimeout(function () { return _this._confirmElement.style.zIndex = -1; }, 400);
                };
                ConfirmComponent.prototype.ngOnInit = function () {
                    this._confirmElement = document.getElementById('confirmationModal');
                    this._cancelButton = document.getElementById('cancelButton');
                    this._okButton = document.getElementById('okButton');
                };
                ConfirmComponent = __decorate([
                    core_1.Component({
                        selector: 'modal-confirm',
                        templateUrl: 'app/shared/confirm/confirm.component.html',
                        styleUrls: ['app/shared/confirm/confirm.component.css']
                    }), 
                    __metadata('design:paramtypes', [confirm_service_1.ConfirmService])
                ], ConfirmComponent);
                return ConfirmComponent;
            }());
            exports_1("ConfirmComponent", ConfirmComponent);
        }
    }
});
//# sourceMappingURL=confirm.component.js.map