import {OnInit, Component} from 'angular2/core';

import {ErrorService} from "./error.service";

const KEY_ESC = 27;

@Component({
    selector: 'modal-error',
    templateUrl: 'app/shared/error/error.component.html',
    styleUrls: ['app/shared/error/error.component.css']
})
export class ErrorComponent implements OnInit {

    private _defaults = {
        title: 'Error',
        message: 'This is an error of the web service variety',
        cancelText: 'Cancel',
        okText: 'OK'
    };
    title:string;
    message:string;
    okText:string;
    cancelText:string;

    private _errorElement:any;
    private _cancelButton:any;
    private _okButton:any;

    constructor(errorService:ErrorService) {
        errorService.activate = this.activate.bind(this);
    }

    _setLabels(message = this._defaults.message, title = this._defaults.title) {
        this.title = title;
        this.message = message;
        this.okText = this._defaults.okText;
        this.cancelText = this._defaults.cancelText;
    }

    activate(message = this._defaults.message, title = this._defaults.title) {
        this._setLabels(message, title);

        let promise = new Promise<boolean>(resolve => {
            this._show(resolve);
        });
        return promise;
    }

    private _show(resolve:(boolean) => any) {
        document.onkeyup = null;

        let negativeOnClick = (e:any) => resolve(false);
        let positiveOnClick = (e:any) => resolve(true);

        if (!this._errorElement || !this._cancelButton || !this._okButtonError) return;

        this._errorElement.style.opacity = 0;
        this._errorElement.style.zIndex = 9999;

        /*this._cancelButton.onclick = ((e:any) => {
            e.preventDefault();
            if (!negativeOnClick(e)) this._hideDialog();
        })*/

        this._okButtonError.onclick = ((e:any) => {
            e.preventDefault();
            if (!positiveOnClick(e)) this._hideDialog()
        });

        this._errorElement.onclick = () => {
            this._hideDialog();
            return negativeOnClick(null);
        };

        document.onkeyup = (e:any) => {
            if (e.which == KEY_ESC) {
                this._hideDialog();
                return negativeOnClick(null);
            }
        };

        this._errorElement.style.opacity = 1;
    }

    private _hideDialog() {
        document.onkeyup = null;
        this._errorElement.style.opacity = 0;
        window.setTimeout(() => this._errorElement.style.zIndex = -1, 400);
    }

    ngOnInit():any {
        this._errorElement = document.getElementById('errorModal');
        //this._cancelButton = document.getElementById('cancelButton');
        this._okButtonWrror = document.getElementById('okButtonError');
    }
}