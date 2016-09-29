import {IBatchFile} from './batchfile';

export interface IResponse {
   jsxid: string
   providerId: string
   dataFileGroupId: string
   userName: string
   caseNumber: string
   overrideCostUpdates: string
   record: IBatchFile[]
        
}

