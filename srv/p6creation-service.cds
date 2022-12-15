using com.lntinfotech.integration.p6Creation as p6creation from '../db/p6creation';


@impl : './p6creation-service.js'

//Added Authorization for below services @(requires: ['system-user','authenticated-user'])
//@(requires: 'authenticated-user')
service p6CreationService @(requires : [
    'system-user',
    'authenticated-user'
]) {
    entity p6Creation      as projection on p6creation.p6Creation;
    entity p6Creationcount as projection on p6creation.p6Creationcount;
    entity p6schedule      as projection on p6creation.p6schedule;
    action   excelBasedPrimavera( activityExcelData : array of actPayload, projectId : String, projectDesc : String) returns excelBasedPrimaveraResponse;

    type actPayload {
        wBSID                 : String;
        activityName          : String;
        activityID            : String;
        baseLineStartDate     : String;
        baseLineFinishDate    : String;
        earlyStartDate        : String;
        earlyFinishDate       : String;
        lastStartDate         : String;
        lastFinishDate        : String;
        // plannedDuration       : String;
        // durationUOM           : String;
        // perForPercentComplete : String;
        //calendarObjectID      : String;
        Phase                 : String;
        LBS                   : String;
        TaskCode              : String;
        Engg                  : String;
        Other                 : String;
        StartDate             : String;
        FinishDate            : String;
        lastUpdateDateCode    : String;
        //activityObjectID      : String;
        ExpectedFinishDate    : String;
    }

    // type projPayload {
    //     startDate               : String;
    //     finishDate              : String;
    //     lastStartDate           : String;
    //     lastFinishDate          : String;
    //     baseLineStartDate       : String;
    //     baseLineFinishDate      : String;
    //     pOC                     : String;
    //     //dataDate                : String;
    //     // lastUpdateDate          : String;
    //     // interfaceDate           : String;
    //     // ForecastStartDate       : String;
    //     // ForecastFinishDate      : String;
    //     SummaryActualStartDate  : String;
    //     SummaryActualFinishDate : String;
    // }

    // type wbsPayload {
    //     //objectID           : String;
    //     wBSID              : String;
    //     wBSName            : String;
    //     parentWBSID        : String;
    //     sequenceNo         : String;
    //     StartDate          : String;
    //     FinishedDate       : String;
    //     baseLineStartDate  : String;
    //     baseLineFinishDate : String
    // }

    type excelBasedPrimaveraResponse {
        result : String;
    }

    function ReqUname(projectid : String)                                                                                                                                                     returns Reqname;

    type Reqname {
        result : String;
    }

    function p6CreatCount(number : Integer)                                                                                                                                                   returns Count;

    type Count {
        d                : {
            icon         : String(500);
            info         : String(50);
            infoState    : String(50);
            number       : Integer;
            numberDigits : Integer;
            numberFactor : String(50);
            numberState  : String(50);
            numberUnit   : String(50);
            stateArrow   : String(50);
            subtitle     : String(50);
            title        : String(50);
        }

    }

    //	function which will accept the project as a parameter OK and which will return Max start date oh where the status of project WBS activity resource calendar is um completed and the start date is less than the current date time
    function MaxStartdatetime(projectID : String)                                                                                                                                             returns maxdate;

    type maxdate {
        result : DateTime;
    }

    function deleteP6CreateSingleData(requestID : String)                                                                                                                                     returns deletedp6Data;

    type deletedp6Data {
        return : String;
    }

    function deleteP6CreateAllData(projectID : String, progresstype : String)                                                                                                                 returns deletedp6AllData;

    type deletedp6AllData {
        return : String;
    }

}

