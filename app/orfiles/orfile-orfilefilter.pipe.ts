import {PipeTransform, Pipe} from 'angular2/core';
import {IORFile} from './orfile';

@Pipe({
    name: 'orfileFilter'
})

export class ORFileFilterPipe implements PipeTransform{
/*
                transform(value:IORFile[], args: string[]): IORFile[]{
                    console.log("args:" + args);
                    let provfilter: string = args[0] ? args[0].toLocaleLowerCase(): null;
                    let filefilter: string = args[1] ? args[1].toLocaleLowerCase(): null;
                    let subfilter: string = args[2] ? args[2].toLocaleLowerCase(): null;
                    let statfilter: string = args[3] ? args[3].toLocaleLowerCase(): null;
*/
                transform(value:IORFile[], argProv, argFile, argSub, argStat): IORFile[]{
                    let provfilter: string = argProv ? argProv.toLocaleLowerCase(): null;
                    let filefilter: string = argFile ? argFile.toLocaleLowerCase(): null;
                    let subfilter: string = argSub ? argSub.toLocaleLowerCase(): null;
                    let statfilter: string = argStat ? argStat.toLocaleLowerCase(): null;
                    console.log("prov: " + provfilter + " - file: " + filefilter + " - sub: " + subfilter + " - stat: " + statfilter);

            if(provfilter){
                value = value.filter((orfile: IORFile) =>
                    orfile.providerID.toLocaleLowerCase().indexOf(provfilter) != -1);
                       
            }
             if(filefilter){
                value = value.filter((value: IORFile) =>
                    value.fileType.toLocaleLowerCase().indexOf(filefilter) != -1);
                    
            }
             if(subfilter){
                value = value.filter((value: IORFile) =>
                    value.fileType_SubsystemDetailType.toLocaleLowerCase().indexOf(subfilter) != -1);
                       
            }
             if(statfilter){
                    if (statfilter==="open cases"){
                        value = value.filter((value: IORFile) =>
                        (value.processStatus.toLocaleLowerCase().indexOf("failed") != -1 || value.processStatus.toLocaleLowerCase().indexOf("in progress") != -1 || value.processStatus.toLocaleLowerCase().indexOf("pending") != -1 || value.processStatus.toLocaleLowerCase().indexOf("waiting for match") != -1 || value.processStatus.toLocaleLowerCase().indexOf("matched") != -1 || value.processStatus.toLocaleLowerCase().indexOf("not matched") != -1));
                    }
                    else {
                        value = value.filter((value: IORFile) =>
                        value.processStatus.toLocaleLowerCase().indexOf(statfilter) != -1);
                    }
            }
           return value;
                
            }
}