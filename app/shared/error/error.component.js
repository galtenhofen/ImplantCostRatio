System.register(['angular2/core', "./error.service"], function(exports_1, context_1) {
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
    var core_1, error_service_1;
    var KEY_ESC, ErrorComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (error_service_1_1) {
                error_service_1 = error_service_1_1;
            }],
        execute: function() {
            KEY_ESC = 27;
            ErrorComponent = (function () {
                function ErrorComponent(errorService) {
                    this._defaults = {
                        title: 'Error',
                        message: 'This is an error of the web service variety',
                        cancelText: 'Cancel',
                        okText: 'Retry'
                    };
                    errorService.activate = this.activate.bind(this);
                }
                ErrorComponent.prototype._setLabels = function (message, title) {
                    if (message === void 0) { message = this._defaults.message; }
                    if (title === void 0) { title = this._defaults.title; }
                    this.title = title;
                    this.message = message;
                    this.okText = this._defaults.okText;
                    this.cancelText = this._defaults.cancelText;
                };
                ErrorComponent.prototype.activate = function (message, title) {
                    var _this = this;
                    if (message === void 0) { message = this._defaults.message; }
                    if (title === void 0) { title = this._defaults.title; }
                    this._setLabels(message, title);
                    var promise = new Promise(function (resolve) {
                        _this._show(resolve);
                    });
                    return promise;
                };
                ErrorComponent.prototype._show = function (resolve) {
                    var _this = this;
                    document.onkeyup = null;
                    var negativeOnClick = function (e) { return resolve(false); };
                    var positiveOnClick = function (e) { return resolve(true); };
                    if (!this._errorElement || !this._cancelButton || !this._okButtonError)
                        return;
                    this._errorElement.style.opacity = 0;
                    this._errorElement.style.zIndex = 9999;
                    this._cancelButton.onclick = (function (e) {
                        e.preventDefault();
                        if (!negativeOnClick(e))
                            _this._hideDialog();
                    });
                    this._okButtonError.onclick = (function (e) {
                        e.preventDefault();
                        if (!positiveOnClick(e))
                            _this._hideDialog();
                    });
                    this._errorElement.onclick = function () {
                        _this._hideDialog();
                        return negativeOnClick(null);
                    };
                    document.onkeyup = function (e) {
                        if (e.which == KEY_ESC) {
                            _this._hideDialog();
                            return negativeOnClick(null);
                        }
                    };
                    this._errorElement.style.opacity = 1;
                };
                ErrorComponent.prototype._hideDialog = function () {
                    var _this = this;
                    document.onkeyup = null;
                    this._errorElement.style.opacity = 0;
                    window.setTimeout(function () { return _this._errorElement.style.zIndex = -1; }, 400);
                };
                ErrorComponent.prototype.ngOnInit = function () {
                    this._errorElement = document.getElementById('errorModal');
                    this._cancelButton = document.getElementById('cancelButton');
                    this._okButtonError = document.getElementById('okButtonError');
                };
                ErrorComponent = __decorate([
                    core_1.Component({
                        selector: 'modal-error',
                        templateUrl: 'app/shared/error/error.component.html',
                        styleUrls: ['app/shared/error/error.component.css']
                    }), 
                    __metadata('design:paramtypes', [error_service_1.ErrorService])
                ], ErrorComponent);
                return ErrorComponent;
            }());
            exports_1("ErrorComponent", ErrorComponent);
        }
    }
});
//# sourceMappingURL=error.component.js.map