export interface IORFile {
        dateFileReceived: string,
        orDataFileGroupID: number,
        providerID: string,
        providerKey: number,
        clientName: string,
        beginDateRange: string,
        endDateRange: string,
        fileType_SubsystemDetailType: string,
        fileType: string,
        fileTypeKey: number,
        subsystemDetailType: string,
        subsystemDetailTypeKey: number,
        rowCountPrep: number,
        rowCountExpected: number,
        rowCountConverted: number,
        processStep: string,
        processStatus: string,
        pduJobNumber: number,
        publishCompleteDate: string,
        errorMessage: string,
        retryCount: number,
        rawFilename: StringConstructor
}
