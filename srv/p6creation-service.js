const cds = require('@sap/cds')

module.exports = (srv) => {
    console.log("srv log" + srv)
    const {
        p6Creation,
        p6Creationcount,
        p6Sechdule
        //candyBOQData
    } = srv.entities('com.lntinfotech.integration.p6Creation')

    const {
        activity,
        project,
        WBS,
        Resource,
        activityID,
        pvActivityJS,
        header,
        activityHistory,
        projectHistory,
        Calendarworkweek,
        CalendarHoliday
        //	activityIDprimavera
    } = srv.entities('com.lntinfotech.primavera.integartion')

    async function getCurrentDate() {
        var date = new Date()
        var mm = date.getMonth() + 1
        var dd = date.getDate()
        var yyyy = date.getFullYear()
        var mins = date.getMinutes()
        var sec = date.getSeconds()
        var hour = date.getHours()

        var out = yyyy + "-" + mm + "-" + dd + "T" + hour + ':' + mins + ':' + sec + "Z";
        return out;
    }

    async function forTime(oValue) {
        var val = oValue.split("T")[0] + " " + oValue.split("T")[1]
        // console.log(val)
        return val
    }

    srv.on('excelBasedPrimavera', async (req) => {
        try {
            let tx = cds.transaction(req);
            const projectID = req.data.projectId
            const projDesc = req.data.projectDesc
            const projPayload = req.data.projExcelData
            const wbsPayload = req.data.wbsExcelData
            const actPayload = req.data.activityExcelData
            // const calWorkPaylaod = req.data.calWorkPaylaod
            // const calHolPayload = req.data.calHolPayload
            // const resPayload = req.data.resPayload

            // For Project Data
            // console.log(projPayload.length + "proj")
            // console.log(wbsPayload.length + "wbs")
            // console.log(actPayload.length + "act")

            if (projPayload.length > 0) {
                let projData = await tx.run(SELECT.from(project).where({
                    projectID: projectID
                }))
                let curDate = await getCurrentDate()
                // console.log(curDate + "projdate")
                // console.log(projData.length + "dblength")
                if (projData.length > 0) {
                    // console.log("inside proj if")
                    await tx.run(DELETE(project).where({
                        projectID: projectID
                    }))
                    let record = {}
                    let result = []

                    for (var i = 0; i < projPayload.length; i++) {
                        record = {}
                        record.projectID = projectID;
                        record.projectName = projDesc;
                        if (projPayload[i].startDate !== "") {
                            record.startDate = new Date(await forTime(projPayload[i].startDate));
                        }
                        if (projPayload[i].finishDate !== "") {
                            record.finishDate = new Date(await forTime(projPayload[i].finishDate));
                        }
                        if (projPayload[i].lastStartDate !== "") {
                            record.lastStartDate = new Date(await forTime(projPayload[i].lastStartDate));
                        }
                        if (projPayload[i].lastFinishDate !== "") {
                            record.lastFinishDate = new Date(await forTime(projPayload[i].lastFinishDate));
                        }
                        if (projPayload[i].baseLineStartDate !== "") {
                            record.baseLineStartDate = new Date(await forTime(projPayload[i].baseLineStartDate));
                        }
                        if (projPayload[i].baseLineFinishDate !== "") {
                            record.baseLineFinishDate = new Date(await forTime(projPayload[i].baseLineFinishDate));
                        }
                        if (projPayload[i].pOC !== "") {
                            record.pOC = projPayload[i].pOC;
                        }
                        record.dataDate = new Date();// today date
                        record.lastUpdateDate = new Date();//today date
                        record.interfaceDate = new Date(); // today date
                        record.deleted = "false"
                        // console.log(projPayload[i].SummaryActualStartDate + "1")
                        // console.log(projPayload[i].ForecastFinishDate + "2")
                        // console.log(projPayload[i].ForecastStartDate + "3")
                        // console.log(projPayload[i].SummaryActualFinishDate + "4")
                        if (projPayload[i].SummaryActualStartDate !== "") {
                            record.SummaryActualStartDate = new Date(await forTime(projPayload[i].SummaryActualStartDate));
                        }
                        // if (projPayload[i].ForecastFinishDate !== "") {
                        //     record.ForecastFinishDate = new Date(await forTime(projPayload[i].ForecastFinishDate));
                        // }
                        // if (projPayload[i].ForecastStartDate !== "") {
                        //     record.ForecastStartDate = new Date(await forTime(projPayload[i].ForecastStartDate));
                        // }
                        if (projPayload[i].SummaryActualFinishDate !== "") {
                            record.SummaryActualFinishDate = new Date(await forTime(projPayload[i].SummaryActualFinishDate));
                        }
                        result.push(record)
                    }
                    await tx.run(INSERT.into(project).entries(result))
                    // console.log("projSuc")

                } else {
                    // Creating new Record
                    // console.log("inside proj create")
                    let record = {}
                    let result = []
                    for (var i = 0; i < projPayload.length; i++) {
                        record = {}
                        record.projectID = projectID;
                        record.projectName = projDesc;
                        if (projPayload[i].startDate !== "") {
                            record.startDate = new Date(await forTime(projPayload[i].startDate));
                        }
                        if (projPayload[i].finishDate !== "") {
                            record.finishDate = new Date(await forTime(projPayload[i].finishDate));
                        }
                        if (projPayload[i].lastStartDate !== "") {
                            record.lastStartDate = new Date(await forTime(projPayload[i].lastStartDate));
                        }
                        if (projPayload[i].lastFinishDate !== "") {
                            record.lastFinishDate = new Date(await forTime(projPayload[i].lastFinishDate));
                        }
                        if (projPayload[i].baseLineStartDate !== "") {
                            record.baseLineStartDate = new Date(await forTime(projPayload[i].baseLineStartDate));
                        }
                        if (projPayload[i].baseLineFinishDate !== "") {
                            record.baseLineFinishDate = new Date(await forTime(projPayload[i].baseLineFinishDate));
                        }
                        if (projPayload[i].pOC !== "") {
                            record.pOC = projPayload[i].pOC;
                        }
                        record.dataDate = new Date();// today date
                        record.lastUpdateDate = new Date();//today date
                        record.interfaceDate = new Date(); // today date
                        record.deleted = "false"
                        // console.log(projPayload[i].SummaryActualStartDate + "1")
                        // console.log(projPayload[i].ForecastFinishDate + "2")
                        // console.log(projPayload[i].ForecastStartDate + "3")
                        // console.log(projPayload[i].SummaryActualFinishDate + "4")
                        if (projPayload[i].SummaryActualStartDate !== "") {
                            record.SummaryActualStartDate = new Date(await forTime(projPayload[i].SummaryActualStartDate));
                        }
                        // if (projPayload[i].ForecastFinishDate !== "") {
                        //     record.ForecastFinishDate = new Date(await forTime(projPayload[i].ForecastFinishDate));
                        // }
                        // if (projPayload[i].ForecastStartDate !== "") {
                        //     record.ForecastStartDate = new Date(await forTime(projPayload[i].ForecastStartDate));
                        // }
                        if (projPayload[i].SummaryActualFinishDate !== "") {
                            record.SummaryActualFinishDate = new Date(await forTime(projPayload[i].SummaryActualFinishDate));
                        }
                        result.push(record)
                        console.log(result.length)
                    }
                    await tx.run(INSERT.into(project).entries(result))
                    // console.log("proj create succesful")
                }
            }
            // For Wbs Data
            if (wbsPayload.length > 0) {
                let wbsData = await tx.run(SELECT.from(WBS).where({
                    projectID: projectID
                }))
                let curDate = await getCurrentDate()
                // console.log(curDate + "wbsdate")
                if (wbsData.length > 0) {
                    // console.log("in delete")
                    await tx.run(DELETE(wbs).where({
                        projectID: projectID
                    }))
                    for (var i = 0; i < wbsPayload.length; i++) {

                        let record = {}
                        let result = []
                        record.projectID = projectID;
                        record.objectID = projectID + "-" + i;
                        record.wBSID = wbsPayload[i].wBSID;
                        record.wBSName = wbsPayload[i].wBSName;
                        record.parentWBSID = wbsPayload[i].parentWBSID;
                        record.sequenceNo = wbsPayload[i].sequenceNo;
                        if (wbsPayload[i].StartDate !== "") {
                            record.StartDate = new Date(await forTime(wbsPayload[i].StartDate));
                        }
                        if (wbsPayload[i].FinishedDate !== "") {
                            record.FinishedDate = new Date(await forTime(wbsPayload[i].FinishedDate));
                        }
                        if (wbsPayload[i].baseLineStartDate !== "") {
                            record.baseLineStartDate = new Date(await forTime(wbsPayload[i].baseLineStartDate));
                        }
                        if (wbsPayload[i].baseLineFinishDate !== "") {
                            record.baseLineFinishDate = new Date(await forTime(wbsPayload[i].baseLineFinishDate));
                        }
                        record.dataDate = new Date();
                        record.lastUpdateDate = new Date();
                        record.interfaceDate = new Date();
                        record.deleted = "false"
                        result.push(record)
                        await tx.run(INSERT.into(WBS).entries(result))

                    }
                } else {
                    // console.log("in create")
                    for (var i = 0; i < wbsPayload.length; i++) {

                        let record = {}
                        let result = []
                        record.projectID = projectID;
                        record.objectID = projectID + "-" + i;
                        record.wBSID = wbsPayload[i].wBSID;
                        record.wBSName = wbsPayload[i].wBSName;
                        record.parentWBSID = wbsPayload[i].parentWBSID;
                        record.sequenceNo = wbsPayload[i].sequenceNo;
                        if (wbsPayload[i].StartDate !== "") {
                            record.StartDate = new Date(await forTime(wbsPayload[i].StartDate));
                        }
                        if (wbsPayload[i].FinishedDate !== "") {
                            record.FinishedDate = new Date(await forTime(wbsPayload[i].FinishedDate));
                        }
                        if (wbsPayload[i].baseLineStartDate !== "") {
                            record.baseLineStartDate = new Date(await forTime(wbsPayload[i].baseLineStartDate));
                        }
                        if (wbsPayload[i].baseLineFinishDate !== "") {
                            record.baseLineFinishDate = new Date(await forTime(wbsPayload[i].baseLineFinishDate));
                        }
                        record.dataDate = new Date();
                        record.lastUpdateDate = new Date();
                        record.interfaceDate = new Date();
                        record.deleted = "false"
                        result.push(record)
                        await tx.run(INSERT.into(WBS).entries(result))

                    }
                }


            }
            // For Activity Data
            if (actPayload.length > 0) {
                let actData = await tx.run(SELECT.from(activity).where({
                    projectID: projectID
                }))
                let curDate = await getCurrentDate()
                console.log(curDate + "actdate")
                // To create and Update
                if (actData.length > 0) {
                    console.log("delete and create")
                    await tx.run(DELETE(activity).where({
                        projectID: projectID
                    }))
                    console.log("in delete and create")
                    for (var i = 0; i < actPayload.length; i++) {
                        let record = {}
                        let result = []
                        record.projectID = projectID;
                        record.wBSID = actPayload[i].wBSID;
                        record.activityID = actPayload[i].activityID;
                        record.activityName = actPayload[i].activityName;
                        if (actPayload[i].baseLineStartDate !== "") {
                            record.baseLineStartDate = new Date(await forTime(actPayload[i].baseLineStartDate));
                        }
                        if (actPayload[i].baseLineFinishDate !== "") {
                            record.baseLineFinishDate = new Date(await forTime(actPayload[i].baseLineFinishDate));
                        }
                        if (actPayload[i].earlyStartDate !== "") {
                            record.earlyStartDate = new Date(await forTime(actPayload[i].earlyStartDate));
                        }
                        if (actPayload[i].earlyFinishDate !== "") {
                            record.earlyFinishDate = new Date(await forTime(actPayload[i].earlyFinishDate));
                        }
                        if (actPayload[i].lastStartDate !== "") {
                            record.lastStartDate = new Date(await forTime(actPayload[i].lastStartDate));
                        }
                        if (actPayload[i].baseLineStartDate !== "") {
                            record.lastFinishDate = new Date(await forTime(actPayload[i].lastFinishDate));
                        }
                        //record.plannedDuration = actPayload[i].plannedDuration;
                        //record.durationUOM = actPayload[i].durationUOM;
                        // record.schedulePercentComplete = actPayload[i].schedulePercentComplete;
                        // record.totalFloat = actPayload[i].totalFloat;
                        // record.perForPercentComplete = actPayload[i].perForPercentComplete;
                        //record.calendarObjectID = actPayload[i].calendarObjectID;
                        record.Phase = actPayload[i].Phase;
                        record.LBS = actPayload[i].LBS;
                        record.TaskCode = actPayload[i].TaskCode;
                        record.Engg = actPayload[i].Engg;
                        record.Other = actPayload[i].Other;
                        record.dataDate = new Date();
                        record.lastUpdateDate = new Date();
                        record.interfaceDate = new Date();

                        if (actPayload[i].StartDate !== "") {
                            record.StartDate = new Date(await forTime(actPayload[i].StartDate));
                        }
                        if (actPayload[i].FinishDate !== "") {
                            record.FinishDate = new Date(await forTime(actPayload[i].FinishDate));
                        }
                        record.lastUpdateDateCode = new Date();
                        record.activityObjectID = projectID + "-" + i;
                        if (actPayload[i].ExpectedFinishDate !== "") {
                            record.ExpectedFinishDate = new Date(await forTime(actPayload[i].ExpectedFinishDate));
                        }
                        record.deleted = "false"
                        result.push(record)
                        await tx.run(INSERT.into(activity).entries(result))

                    }
                    console.log("act del create added")
                } else {
                    console.log("IN create")
                    for (var i = 0; i < actPayload.length; i++) {
                        let record = {}
                        let result = []
                        record.projectID = projectID;
                        record.wBSID = actPayload[i].wBSID;
                        record.activityID = actPayload[i].activityID;
                        record.activityName = actPayload[i].activityName;
                        if (actPayload[i].baseLineStartDate !== "") {
                            record.baseLineStartDate = new Date(await forTime(actPayload[i].baseLineStartDate));
                        }
                        if (actPayload[i].baseLineFinishDate !== "") {
                            record.baseLineFinishDate = new Date(await forTime(actPayload[i].baseLineFinishDate));
                        }
                        if (actPayload[i].earlyStartDate !== "") {
                            record.earlyStartDate = new Date(await forTime(actPayload[i].earlyStartDate));
                        }
                        if (actPayload[i].earlyFinishDate !== "") {
                            record.earlyFinishDate = new Date(await forTime(actPayload[i].earlyFinishDate));
                        }
                        if (actPayload[i].lastStartDate !== "") {
                            record.lastStartDate = new Date(await forTime(actPayload[i].lastStartDate));
                        }
                        if (actPayload[i].baseLineStartDate !== "") {
                            record.lastFinishDate = new Date(await forTime(actPayload[i].lastFinishDate));
                        }
                        //record.plannedDuration = actPayload[i].plannedDuration;
                        //record.durationUOM = actPayload[i].durationUOM;
                        // record.schedulePercentComplete = actPayload[i].schedulePercentComplete;
                        // record.totalFloat = actPayload[i].totalFloat;
                        // record.perForPercentComplete = actPayload[i].perForPercentComplete;
                        //record.calendarObjectID = actPayload[i].calendarObjectID;
                        record.Phase = actPayload[i].Phase;
                        record.LBS = actPayload[i].LBS;
                        record.TaskCode = actPayload[i].TaskCode;
                        record.Engg = actPayload[i].Engg;
                        record.Other = actPayload[i].Other;
                        record.dataDate = new Date();
                        record.lastUpdateDate = new Date();
                        record.interfaceDate = new Date();

                        if (actPayload[i].StartDate !== "") {
                            record.StartDate = new Date(await forTime(actPayload[i].StartDate));
                        }
                        if (actPayload[i].FinishDate !== "") {
                            record.FinishDate = new Date(await forTime(actPayload[i].FinishDate));
                        }
                        record.lastUpdateDateCode = new Date();
                        record.activityObjectID = projectID + "-" + i;
                        if (actPayload[i].ExpectedFinishDate !== "") {
                            record.ExpectedFinishDate = new Date(await forTime(actPayload[i].ExpectedFinishDate));
                        }
                        record.deleted = "false"
                        result.push(record)
                        console.log(result.length + "i")
                        await tx.run(INSERT.into(activity).entries(result))

                    }
                    console.log("act create added")
                }


            }


            debugmessage = 'File Uploaded Successfully'
            return {
                result: debugmessage
            }

        } catch (e) {
            debugmessage = 'Error in Processing the File'
            return {
                result: debugmessage
            }
        }
    })

    srv.on('ReqUname', async (req) => {
        return {
            result: req.user.id
        }

    })
    srv.before('READ', 'p6Creation', async (req) => {
        try {
            // console.log(req.user)
            // console.log(req.user.attr.projectAccess + "p6Creation")
            if (!req.user.is('system-user')) {
                if (req.user.attr.projectAccess !== undefined) {
                    if (req.user.attr.projectAccess.includes("*") === false) {
                        const whereStr = { projectID: { in: req.user.attr.projectAccess } };
                        //let cqn4 = cds.parse.expr('formName in (' + req.user.lettertype + ')'); // form as SQL where query with attribute
                        req.query.where(whereStr); // add the where CQN to the request Query
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    })
    srv.before('READ', 'p6Creationcount', async (req) => {

        let tx = cds.transaction(req)
        console.log(req.data)
        let affectedrows = 0;
        let p6Creationcalc = await tx.run(SELECT.from(p6Creation, p6Creation => {
            //	p6Creation.requestID,
            p6Creation.projectID,
                p6Creation.project_status,
                p6Creation.wbs_status,
                p6Creation.activity_status,
                p6Creation.calendar_status,
                p6Creation.resource_status
        }))

        console.log("updated " + p6Creationcalc + " in PPA_APContractDeliverables")
        let record = {}
        let result = []
        p6Creationcalc.forEach(data => {

            console.log("Inside Loop")
            if (data.project_status === "Error" || data.wbs_status === "Error" || data.activity_status === "Error" || data.calendar_status ===
                "Error" || data.resource_status === "Error") {
                affectedrows = affectedrows + 1
            }
            console.log(affectedrows)
        })
        //	p6Creationcalc.forEach(row => {
        record = {}
        record.icon = "sap-icon://travel-expense"
        record.info = "P6 Integration"
        record.infoState = "Critical"
        record.number = affectedrows
        record.numberDigits = 1
        record.numberFactor = "k"
        //	record.numberState = "Positive"
        //	record.numberUnit = "EUR"
        record.stateArrow = "Up"
        record.subtitle = "P6 Integration"
        record.title = "P6 Integration"
        result.push(record)

        //	})
        await tx.run(DELETE.from(p6Creationcount).where({
            numberDigits: 1
        }))
        await tx.run(INSERT.into(p6Creationcount).entries(result))
        debugmessage = 'Inserted successfully ' + result + ' rows in table'
        console.log(debugmessage)

    })

    srv.on('p6CreatCount', async (req) => {
        let tx = cds.transaction(req)
        console.log(req.data)
        let affectedrows = 0;
        let p6Creationcalc = await tx.run(SELECT.from(p6Creation, p6Creation => {
            //	p6Creation.requestID,
            p6Creation.projectID,
                p6Creation.project_status,
                p6Creation.wbs_status,
                p6Creation.activity_status,
                p6Creation.calendar_status,
                p6Creation.resource_status
        }))

        console.log("updated " + p6Creationcalc + " in PPA_APContractDeliverables")
        let record = {}
        let result = []
        p6Creationcalc.forEach(data => {

            console.log("Inside Loop")
            if (data.project_status === "Error" || data.wbs_status === "Error" || data.activity_status === "Error" || data.calendar_status ===
                "Error" || data.resource_status === "Error") {
                affectedrows = affectedrows + 1
            }
            console.log(affectedrows)
        })
        //	p6Creationcalc.forEach(row => {
        record = {}
        record.icon = "sap-icon://travel-expense"
        record.info = "P6 Integration"
        record.infoState = "Critical"
        record.number = affectedrows
        record.numberDigits = 1
        record.numberFactor = "k"
        //	record.numberState = "Positive"
        //	record.numberUnit = "EUR"
        record.stateArrow = "Up"
        record.subtitle = "P6 Integration"
        record.title = "P6 Integration"
        result.push(record)
        return {
            d: {
                icon: "sap-icon://travel-expense",
                info: "P6 Integration",
                infoState: "Critical",
                number: affectedrows,
                numberDigits: 1,
                numberFactor: "k",
                numberState: "Positive",
                numberUnit: "EUR",
                stateArrow: "Up",
                subtitle: "P6 Integration",
                title: "P6 Integration"
            }

        }

    })
    srv.on('MaxStartdatetime', async (req) => {
        let tx = cds.transaction(req)
        console.log(req.data)
        console.log(req.data.projectID)
        let affectedrows = 0;
        let p6Creationcalc = await tx.run(SELECT.from(p6Creation, p6Creation => {
            //	p6Creation.requestID,
            p6Creation.projectID,
                p6Creation.project_status,
                p6Creation.wbs_status,
                p6Creation.activity_status,
                p6Creation.calendar_status,
                p6Creation.resource_status,
                p6Creation.StartDatetime
        }).where({
            project_status: "Completed",
            wbs_status: "Completed",
            activity_status: "Completed",
            calendar_status: "Completed",
            resource_status: "Completed",
            projectID: req.data.projectID

        }))
        let record = {}
        let result = []
        console.log(p6Creationcalc)
        p6Creationcalc.forEach(data => {

            console.log("Inside Loop")
            if (new Date(data.StartDatetime) < new Date()) {
                record = {}
                record = new Date(data.StartDatetime)
                result.push(record)
            }
            console.log(result)
        })
        var maximumDate = new Date(Math.max.apply(null, result))
        console.log(maximumDate)

        return {
            result: maximumDate.toJSON()
        }

    })

    srv.after('CREATE', 'p6schedule', async (p6schedule, req) => {
        let tx = cds.transaction(req)

        let scheduleItemArray = []
        let sDate = p6schedule.startDate + " " + p6schedule.interfaceTime
        let eDate = p6schedule.EndDate + " " + p6schedule.interfaceTime
        let startDate = new Date(sDate)
        let endDate = new Date(eDate)
        let currentDate = new Date(startDate)
        let scheduleDateResult = []
        let day = p6schedule.dayOfMonth

        if (p6schedule.frequency === "Monthly") {
            currentDate.setDate(day);
            while (currentDate <= endDate) {
                if (currentDate >= startDate) {
                    scheduleDateResult.push(new Date(+currentDate));
                }
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else {
            currentDate.setDate(currentDate.getDate() + (day - currentDate.getDay() + 7) % 7)
            while (currentDate <= endDate) {
                scheduleDateResult.push(new Date(+currentDate));
                currentDate.setDate(currentDate.getDate() + 7);
            }
        }

        if (scheduleDateResult.length > 0) {
            scheduleDateResult.forEach(dateItem => {
                let scheduleRecord = {}
                let scheduleDate = new Date(+dateItem);
                // let _schDate = [
                // 	scheduleDate.getFullYear(),
                // 	('0' + (scheduleDate.getMonth() + 1)).slice(-2),
                // 	('0' + scheduleDate.getDate()).slice(-2)
                // ].join('-');
                // let _schtime = [
                // 	('0' + scheduleDate.getHours()).slice(-2),
                // 	('0' + scheduleDate.getMinutes()).slice(-2),
                // 	('0' + scheduleDate.getSeconds()).slice(-2)
                // ].join(':')

                scheduleRecord.parentID = p6schedule.ID
                scheduleRecord.projectID = p6schedule.projectID
                scheduleRecord.project_status = "SCHEDULED"
                scheduleRecord.wbs_status = "SCHEDULED"
                scheduleRecord.activity_status = "SCHEDULED"
                scheduleRecord.calendar_status = "SCHEDULED"
                scheduleRecord.resource_status = "SCHEDULED"
                scheduleRecord.progresstype = p6schedule.progresstype
                scheduleRecord.requestedBy = p6schedule.requestedBy
                scheduleRecord.StartDatetime = scheduleDate.toISOString()
                scheduleRecord.frequency = p6schedule.frequency
                console.log(scheduleRecord)
                scheduleItemArray.push(scheduleRecord)
            })

            console.log(scheduleItemArray)

            await tx.run(INSERT.into(p6Creation).entries(scheduleItemArray))

            debugmessage = 'Inserted successfully ' + scheduleItemArray.length + ' p6Creation'
            console.log(debugmessage)
        }

    })

    srv.on("deleteP6CreateSingleData", async (req) => {

        let tx = cds.transaction(req)

        let deletedp6Data = await tx.run(DELETE.from(p6Creation).where({
            requestID: req.data.requestID
        }))
        console.log(req.data.requestID)

        return {
            result: deletedp6Data
        }

    })

    srv.on("deleteP6CreateAllData", async (req) => {

        let tx = cds.transaction(req)
        if (req.data.progresstype != "DeleteAll") {
            if (req.data.progresstype != '' || req.data.progresstype != null) {
                let deletedp6AllData = await tx.run(DELETE.from(p6Creation).where({
                    projectID: req.data.projectID,
                    progresstype: req.data.progresstype,
                    project_status: "SCHEDULED",
                    wbs_status: "SCHEDULED",
                    activity_status: "SCHEDULED",
                    calendar_status: "SCHEDULED",
                    resource_status: "SCHEDULED"
                }))
            }
        } else {
            let deletedp6AllData = await tx.run(DELETE.from(p6Creation).where({
                projectID: req.data.projectID,
                project_status: "SCHEDULED",
                wbs_status: "SCHEDULED",
                activity_status: "SCHEDULED",
                calendar_status: "SCHEDULED",
                resource_status: "SCHEDULED"
            }))
        }

        console.log(req.data.projectID)

        return {
            result: "Success"
        }

    })

}