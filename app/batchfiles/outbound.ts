import {ICostUpdate} from './costupdate';

export interface IOutbound {
   jsxid: string
   providerId: string
   dataFileGroupId: string
   userName: string
   caseNumber: string
   overrideCostUpdates: string
   record: ICostUpdate[]
        
}

