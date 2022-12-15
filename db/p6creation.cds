namespace com.lntinfotech.integration.p6Creation;

using {
    managed,
    cuid
} from '@sap/cds/common';

entity p6Creation : managed {
    key requestID               : UUID;
        parentID                : UUID;
        projectID               : String(20);
        project_status          : String(20);
        wbs_status              : String(20);
        activity_status         : String(20);
        requestedBy             : String(130);
        calendar_status         : String(20);
        resource_status         : String(20);
        snap_shot_status        : String(20);
        project_deleted_status  : String(20);
        wbs_deleted_status      : String(20);
        activity_deleted_status : String(20);
        resource_deleted_status : String(20);
        StartDatetime           : DateTime;
        progresstype            : String(125);
        period                  : String(25);
        frequency               : String(25);
        source                  : String(50);
/*	budgetType : String(20);
 ibcDescription : String(200);
 reasonDescription : String(500);
 ibcRevision : String(50);
 lastRevisionDate : Date;
 importDate : Date;
 ibcno : String(50);*/

}

entity p6Creationcount : managed {
    key requestID    : UUID;
        icon         : String(500);
        info         : String(50);
        infoState    : String(50);
        number       : Integer;
        numberDigits : Integer;
        numberFactor : String(50);
        stateArrow   : String(50);
        subtitle     : String(50);
        title        : String(50);
/*	"icon": "sap-icon://travel-expense",
                               "info": "Quarter Ends!",
                               "infoState": "Critical",
                               "number": 43.333,
                               "numberDigits": 1,
                               "numberFactor": "k",
                               "numberState": "Positive",
                               "numberUnit": "EUR",
                               "stateArrow": "Up",
                               "subtitle": "Quarterly overview",
                               "title": "Travel Expenses"*/

}

// entities to call p6 schedule table

entity p6schedule : cuid, managed {
    projectID       : String(25);
    frequency       : String(25);
    progresstype    : String(125);
    period          : String(25);
    dayOfMonth      : Integer;
    interfaceTime   : Time;
    startDate       : Date;
    EndDate         : Date;
    requestedBy     : String(130);
    p6creationitems : Composition of many p6Creation
                          on p6creationitems.parentID = ID;
}

