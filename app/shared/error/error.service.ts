import {Injectable} from "angular2/core";

@Injectable()
export class ErrorService {
   activate: (message?: string, title?: string) => Promise<boolean>;
}