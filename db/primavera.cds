namespace com.lntinfotech.primavera.integartion;

using {
    managed,
    cuid
} from '@sap/cds/common';

using {com.lntinfotech.integration as pc} from '../db/p6creation';

entity project : managed {
    key projectID               : String(20);
        projectName             : String(100);
        startDate               : DateTime;
        finishDate              : DateTime;
        lastStartDate           : DateTime;
        lastFinishDate          : DateTime;
        baseLineStartDate       : DateTime;
        baseLineFinishDate      : DateTime;
        pOC                     : String(50);
        dataDate                : DateTime;
        lastUpdateDate          : DateTime;
        interfaceDate           : DateTime;
        /*	createdDate			: DateTime;
      modifiedDate		: DateTime;*/
        deleted                 : String(10);
        ForecastStartDate       : DateTime;
        ForecastFinishDate      : DateTime;
        SummaryActualStartDate  : DateTime;
        SummaryActualFinishDate : DateTime;

        WBSItem                 : Composition of many WBS
                                      on WBSItem.projectID = projectID;
        ActivityItem            : Composition of many activity
                                      on ActivityItem.projectID = projectID;

}

entity WBS : managed {
    key projectID          : String(20);
    key objectID           : String(20);
        wBSID              : String(20);
        wBSName            : String(500);
        parentWBSID        : String(20);
        sequenceNo         : String(20);
        StartDate          : DateTime;
        FinishedDate       : DateTime;
        baseLineStartDate  : DateTime;
        baseLineFinishDate : DateTime;
        dataDate           : DateTime;
        lastUpdateDate     : DateTime;
        interfaceDate      : DateTime;
        /*	createdDate			: DateTime;
      modifiedDate		: DateTime;*/
        deleted            : String(10);
}


entity activity : managed {
    key projectID               : String(20);
        wBSID                   : String(25);
        activityID              : String(25);
        activityName            : String(2000);
        baseLineStartDate       : DateTime;
        baseLineFinishDate      : DateTime;
        earlyStartDate          : DateTime;
        earlyFinishDate         : DateTime;
        lastStartDate           : DateTime;
        lastFinishDate          : DateTime;
        plannedDuration         : Decimal(10, 2);
        durationUOM             : String(100);
        schedulePercentComplete : Decimal(10, 2);
        totalFloat              : Decimal(10, 2);
        perForPercentComplete   : Decimal(10, 2);
        calendarObjectID        : String(20);
        Phase                   : String(100);
        LBS                     : String(100);
        TaskCode                : String(100);
        Engg                    : String(100);
        Other                   : String(100);
        dataDate                : DateTime;
        lastUpdateDate          : DateTime;
        interfaceDate           : DateTime;
        deleted                 : String(10);
        StartDate               : DateTime;
        FinishDate              : DateTime;
        lastUpdateDateCode      : DateTime;
    key activityObjectID        : String(20);
        ExpectedFinishDate      : DateTime;
}

entity activityID {
    key activityID : String(25);
}

entity P6Project {
    key projectID    : String(20);
        ProjectItem  : Composition of many project
                           on ProjectItem.projectID = projectID;
        WBSItem      : Composition of many WBS
                           on WBSItem.projectID = projectID;
        ActivityItem : Composition of many activity
                           on ActivityItem.projectID = projectID;
}

entity Calendarworkweek : managed {
    key projectID      : String(20);
    key requestID      : UUID;
        CalenderId     : String(25);
        names          : String(100);
        types          : String(25);
        HoursPerDay    : String(25);
        HoursPerWeek   : String(25);
        HoursPerMonth  : String(25);
        HoursPerYear   : String(25);
        LastUpdateDate : DateTime;
        Sunday         : String(10);
        Monday         : String(10);
        Tuesday        : String(10);
        Wednesday      : String(10);
        Thursday       : String(10);
        Friday         : String(10);
        Saturday       : String(10);
        HolidayItem    : Composition of many CalendarHoliday
                             on HolidayItem.projectID = projectID;
}

entity CalendarHoliday : managed {
    key projectID           : String(20);
    key requestID           : UUID;
        CalenderId          : String(25);
        names               : String(100);
        Types               : String(25);
        HolidayOrExceptions : DateTime

}


entity Resource : managed {
    key projectID           : String(20);
    key resourceID          : String(20);
    key activityID          : String(25);
        ResourceType        : String(25);
        ResourceName        : String(50);
        ResourceCodetypDesc : String(100);
        Plannedunit         : String(50);
        ReosurceUOM         : String(50);
        lastUpdateDate      : DateTime;
        interfaceDate       : DateTime;
        deleted             : String(10);
        PlannedUnitsPerTime : Decimal(38, 6);
        PlannedDuration     : Decimal(38, 6);
        PlannedStartDate    : DateTime;
        PlannedFinishDate   : DateTime;
        CalendarObjectId    : String(50);
        IsActive            : String(20);
        ObjectId            : String(50);

}

// entity to be called while job scheduler will get run

entity pvActivityJS : managed {
    key projectID             : String(20);
        wBSID                 : String(25);
    key activityID            : String(25);
        perForPercentComplete : Decimal(10, 2);
}

// entities for table structure snapshots

entity header : cuid, managed {
    requestID     : pc.p6Creation.p6Creation.requestID;
    moduleType    : String(25);
    projectID     : String(25);
    period        : String(25);
    createDate    : Date;
    activityItems : Composition of many activityHistory
                        on activityItems.headerID = ID;
    projectItems  : Composition of many projectHistory
                        on projectItems.headerID = ID;
    // activityItems : Composition of many activityHistory on activityItems.parent = $self;
    // projectItems : Composition of many projectHistory on projectItems.parent = $self;
    endDate       : DateTime;
}

entity activityHistory : cuid, managed {
    // parent  : Association to header;
    headerID                : String;
    projectID               : String(25);
    wbsID                   : String(25);
    activityID              : String(25);
    schedulePercentComplete : Decimal(10, 2);
    perForPercentComplete   : Decimal(10, 2);
    moduleType              : String(25);
    period                  : String(25);
    startDate               : DateTime;
    endDate                 : DateTime;
    createDate              : Date;
}

entity projectHistory : cuid, managed {
    // parent : Association to header;
    headerID   : String;
    projectID  : String(25);
    pOC        : String(50);
    moduleType : String(25);
    period     : String(25);
    startDate  : DateTime;
    endDate    : DateTime;
    createDate : Date;
}
