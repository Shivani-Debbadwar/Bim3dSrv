using com.lntinfotech.primavera.integartion as primavera from '../db/primavera';

//@(requires: 'authenticated-user')
@impl : './primavera-service.js'

//Added Authorization for below services @(requires: ['system-user','authenticated-user'])
service PrimaveraService @(requires : [
    'system-user',
    'authenticated-user'
]){
    entity project          as projection on primavera.project;
    entity WBS              as projection on primavera.WBS;
    entity activity         as projection on primavera.activity;
    entity P6Project        as projection on primavera.P6Project;
    entity Calendarworkweek as projection on primavera.Calendarworkweek;
    entity CalendarHoliday  as projection on primavera.CalendarHoliday;
    entity Resource         as projection on primavera.Resource;
    // entity p6schedule as projection on primavera.p6schedule;
    // entity p6creation as projection on primavera.p6creation;
    entity header           as projection on primavera.header;
    entity activityHistory  as projection on primavera.activityHistory;
    entity projectHistory   as projection on primavera.projectHistory;


    entity Activityupdate   as
        select from primavera.activity as Activity {
            key Activity.activityObjectID,
                Activity.Phase,
                Activity.LBS,
                Activity.TaskCode,
                Activity.Engg,
                Activity.Other
        };

    entity activityID       as projection on primavera.activityID;
    /*	entity activityIDprimavera as  select from primavera.activity as Activity{
      key Activity.activityID

     };*/
    entity pvActivityJS     as projection on primavera.pvActivityJS;
    // this function will get call in job scheduler to get execute
    function jobSchedulerPrimaActivity(projectID : String, wBSID : String, activityID : String) returns jobSchPrimActivity;

    type jobSchPrimActivity {
        result : String;
    }

    function setDeletedActivityID(sProjectId : String, sWBSIDs : String, sActivityIDs : String) returns setDeletedFalg;

    type setDeletedFalg {
        result : String;
    }

    function setDeletedWBSID(sProjectId : String, sWBSIDs : String) returns setDeletedFalg;
    // function setDeletedResourceID(sProjectId:String,sResourceIDs:String,sActivityIDs:String) returns setDeletedFalg;
    function setDeletedResourceID(sProjectId : String, sResourceIDs : String) returns setDeletedFalg;


// type actionInput {
// 	result : many String;
// }

// type activityList : many String ;
// // action checkActivityID(activityList: activityList) returns activityList;
// action checkActivityID(activityList: actionInput) returns actionInput;


}

