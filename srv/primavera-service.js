const cds = require('@sap/cds')

module.exports = (srv) => {
    console.log("srv log" + srv)
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

	/*	srv.after('CREATE', activityID, async(activityID, req) => {
			let tx = cds.transaction(req);

			let record = {}
			let result = []
			let ActgivityID = activityID
			console.log(ActgivityID);
			let Reasontemp = await tx.run(DELETE.from(activityID))
			var i = 0;
			var j = 0;
			//	for (j = 0; j < activity.length; j++) {
			for (i = 0; i < activityID.length; i++) {
				let activitytemp = await tx.run(select.from(activity, activity => {
					activity.activityID

				}).where({
					activityID < > ActgivityID[i].activityID
				}))
				if (activitytemp.length === 0) {
					record = {}
					record.activityID = activitytemp.activityID
					result.push(record)
				}
			}
			await tx.run(INSERT.into(activityID).entries(result))
			debugmessage = 'Inserted successfully ' + result.length + ' rows in BOQitem'
			console.log(debugmessage)
			console.log(result);
			//}

			//	}
			//	activityID.forEach

		})
		//let tx = cds.transaction(req)
		console.log(req.data)
		console.log(activityID)
		let tx = cds.transaction(req);

		let record = {}
		let result = []
		let ActgivityID = activityID
		console.log(ActgivityID);
		let activitytemp2 = await tx.run(SELECT.from(activityID, activity => {
			activity.activityID

		}));
			console.log(activitytemp2);
		console.log("activitytemp2");	
		if (activitytemp2.length !== 0) {
			console.log("Inside Loop")
			let Reasontemp = await tx.run(DELETE.from(activityID))

		}
		var i = 0;
		var j = 0;
		//	for (j = 0; j < activity.length; j++) {
		for (i = 0; i < ActgivityID.length; i++) {
				console.log("Inside Loop1")
			let activitytemp = await tx.run(SELECT.from(activity, activity => {
				activity.activityID

			}).where({
				activityID: {
					'!=': ActgivityID[i].activityID
				}
			}))
				console.log(activitytemp)
			if (activitytemp.length === 0) {
				record = {}
				record.activityID = activitytemp.activityID
				result.push(record)
			}
		}

		await tx.run(INSERT.into(activityID).entries(result));
		//	let debugmessage = 'Inserted successfully ' + result.length + ' rows in BOQitem';
		//	console.log(debugmessage) console.log(result);

	})
		
		
		
		
		*/

    // 	srv.on('checkActivityID', req => {
    // 		let tx = cds.transaction(req)
    // 		data = '{ "activityID" : "6456"}' 
    // 		//console.log(tx)
    // 		//console.log(req.reply)
    // 		console.log(req.data)
    // 		let debugmessage = 'Create after activityID'
    // 		console.log(debugmessage)

    // 		// let activitytemp2 = await tx.run(SELECT.from(activityID));
    // 		// console.log(activitytemp2)
    // 		let ActivityIDCopy = req.data.activityList.result
    // 		console.log(ActivityIDCopy)
    // 		console.log(ActivityIDCopy.length)
    // 			/*if (activitytemp2.length !== 0) {
    // 				let Reasontemp = await tx.run(DELETE.from(activityID))
    // 			}*/
    // 		let record = {}
    // 		let result = []
    // 		var i = 0;
    // 		var j = 0;
    // 		//	for (j = 0; j < activity.length; j++) {
    // 		for (i = 0; i < ActivityIDCopy.length; i++) {
    // 			console.log("Inside Loop1")
    // 			let activitytempo =  tx.run(SELECT.from(activity => {
    // 				activitytemp1.activityID
    // 			}).where({
    // 				activityID: {
    // 					'=': ActivityIDCopy[i]
    // 				}
    // 			}))
    // 			console.log(activitytempo)
    // 			if (activitytempo.length === 0) {
    // 				record = []
    // 				result.push(activitytempo.activityID)
    // 			}
    // 		}
    // 		if (result, length != 0) {
    // 			 tx.run(INSERT.into(activityID).entries(result))
    // 		}
    // 		//		
    // 		return {"result": result}
    // // })
    // activity,
    //     project,
    //     WBS,
    //     Resource,
    //     activityID,
    //     pvActivityJS,
    //     header,
    //     activityHistory,
    //     projectHistory
    srv.before('READ', 'projectHistory', async (req) => {
        try {
            console.log(req.user.attr.projectAccess + "primavera")
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
    srv.before('READ', 'activityHistory', async (req) => {
        try {
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
    srv.before('READ', 'CalendarHoliday', async (req) => {
        try {
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
    srv.before('READ', 'Calendarworkweek', async (req) => {
        try {
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
    srv.before('READ', 'Resource', async (req) => {
        try {
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
    srv.before('READ', 'WBS', async (req) => {
        try {
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
    srv.before('READ', 'project', async (req) => {
        try {
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
    srv.before('READ', 'activity', async (req) => {
        try {
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
    srv.after('CREATE', 'header', async (headerdata, req) => {
        let tx = cds.transaction(req)
        // console.log(headerdata.ID)
        // console.log(headerdata.projectID)

        let debugmessage = 'Create after Header'
        // console.log(debugmessage)
        let activityItemArray = []
        let projectItemArray = []

        let date_ob = new Date();
        // console.log("Project ID " + date_ob)
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let period = ((month.toString()).concat(".", year.toString()))
        let concMonYr = ((year.toString()).concat("-", month.toString()))
        let finalYear = ((concMonYr.toString()).concat("-", date.toString()))

        await tx.run(UPDATE(header).set({
            /*	period: period,*/
            createDate: finalYear
        }).where({
            ID: headerdata.ID
        })).then(affectedRows => {
            // console.log('Header entity updated: ' + affectedRows)
        })

        let activityData = await tx.run(SELECT.from(SELECT.from(activity, activityItems => {
            activityItems.projectID,
                activityItems.activityID,
                activityItems.wBSID,
                activityItems.schedulePercentComplete,
                activityItems.perForPercentComplete
        }).where({
            projectID: headerdata.projectID
        })));

        // console.log('total activityData: ' + activityData.length)
        activityData.forEach(activityItemDetails => {
            record = {}
            record.headerID = headerdata.ID
            record.projectID = activityItemDetails.projectID
            record.wbsID = activityItemDetails.wBSID
            record.activityID = activityItemDetails.activityID
            if (activityItemDetails.schedulePercentComplete === null || activityItemDetails.schedulePercentComplete === "") {
                // console.log("inside If condition")
                record.schedulePercentComplete = '0.00'
            } else {
                // console.log("inside else condition")
                record.schedulePercentComplete = parseFloat(activityItemDetails.schedulePercentComplete).toFixed(2)
            }
            record.perForPercentComplete = activityItemDetails.perForPercentComplete
            if (activityItemDetails.perForPercentComplete === null || activityItemDetails.perForPercentComplete === "") {
                // console.log("inside If condition")
                record.perForPercentComplete = '0.00'
            } else {
                // console.log("inside else condition")
                record.perForPercentComplete = parseFloat(activityItemDetails.perForPercentComplete).toFixed(2)
            }
            record.moduleType = headerdata.moduleType
            record.period = headerdata.period
            record.endDate = headerdata.endDate
            record.createDate = finalYear
            activityItemArray.push(record)
            // childContractNumberArray.push(record.contractNumber)
        })

        console.log("Activity  New Data " + activityItemArray.length)
        if (activityItemArray.length > 0) {

            await tx.run(INSERT.into(activityHistory).entries(activityItemArray))
            debugmessage = 'Inserted successfully ' + activityItemArray.length + ' rows in activityHistory'
            // console.log(debugmessage)
        }

        let projectData = await tx.run(SELECT.from(SELECT.from(project, projectItems => {
            projectItems.projectID,
                projectItems.projectName,
                projectItems.pOC
        }).where({
            projectID: headerdata.projectID
        })));

        console.log('total projectData: ' + projectData.length)
        projectData.forEach(projectItemDetails => {
            record = {}
            record.headerID = headerdata.ID
            record.projectID = projectItemDetails.projectID
            record.pOC = projectItemDetails.pOC
            record.moduleType = headerdata.moduleType
            record.period = headerdata.period
            record.endDate = headerdata.endDate
            record.createDate = finalYear
            projectItemArray.push(record)
            // childContractNumberArray.push(record.contractNumber)
        })

        console.log("Project  New Data " + projectItemArray.length)
        if (projectItemArray.length > 0) {

            await tx.run(INSERT.into(projectHistory).entries(projectItemArray))
            debugmessage = 'Inserted successfully ' + projectItemArray.length + ' rows in projectHistory'
            // console.log(debugmessage)
        }

    })

    // 	srv.before('CREATE', 'activityID', async(activity, req) => {
    // 		let tx = cds.transaction(req)
    // 			//console.log(req.data)
    // 		console.log("Before Create")
    // 		let Reasontemp = await tx.run(DELETE.from(activityID))
    // 		//		
    // 	})

    // updating deleted flag in activity table to true for all records which are present in CAP but not in primavera P6 system
    //Below function is triggered by CPI iFLow
    srv.on('setDeletedActivityID', async (req) => {
        console.log("Inside delete Activity");
        const paraProjectID = req.data.sProjectId
        const paraWBSID = req.data.sWBSIDs
        const paraActivityID = req.data.sActivityIDs

        let tx = cds.transaction(req)

        var wbsIdOutput = paraWBSID.split(',');
        const wbsIdOutputWithQuotes = "'" + wbsIdOutput.join("','") + "'"

        var activityIDOutput = paraActivityID.split(',');
        const actIDOutputWithQuotes = "'" + activityIDOutput.join("','") + "'"
        // console.log(activity['@cds.persistence.name']);

        let sQuery = "select projectID, activityObjectID, wBSID  from COM_LTI_PRIMAVERA_INTEGARTION_ACTIVITY WHERE projectID='" + paraProjectID + "' and (( activityObjectID not in (" + actIDOutputWithQuotes + ") and wBSID in (" +
            wbsIdOutputWithQuotes + ")) or ( activityObjectID in (" + actIDOutputWithQuotes + ") and wBSID not in (" +
            wbsIdOutputWithQuotes + ")))",
            // query = cds.parse.cql(sQuery)
            query = (sQuery)

        // let notPresentActivityID1 = await tx.run(query)
        let notPresentActivityID = await tx.run(query)

        if (notPresentActivityID.length > 0) {

            for (i = 0; i < notPresentActivityID.length; i++) {
                console.log("In delete Activity loop");
                console.log(notPresentActivityID[i].activityObjectID)
                for (j = 0; j < wbsIdOutput.length; j++) {
                    await tx.run(UPDATE(activity)
                        .set({
                            deleted: 'true'
                        })
                        .where({
                            projectID: paraProjectID,
                            activityObjectID: notPresentActivityID[i].activityObjectID,
                            wBSID: wbsIdOutput[j]
                        })

                    ).then(affectedRows => {
                        console.log('Number of activityID updated:: ' + affectedRows)
                    })
                }
            }

        }

        return {
            result: 'Deleted flag updated to True for ' + notPresentActivityID.length + ' records'
        }

    })

    // updating deleted flag in WBS table to true for all records which are present in CAP but not in primavera P6 system
    //Below function is triggered by CPI iFLow
    srv.on('setDeletedWBSID', async (req) => {

        const paraProjectID = req.data.sProjectId
        const paraWBSID = req.data.sWBSIDs

        let tx = cds.transaction(req)

        var wbsIdOutput = paraWBSID.split(',');
        const wbsIdOutputWithQuotes = "'" + wbsIdOutput.join("','") + "'"

        // console.log(WBS['@cds.persistence.name']);

        let sQuery = "select projectID, objectID, wBSID  from COM_LTI_PRIMAVERA_INTEGARTION_WBS WHERE projectID='" + paraProjectID + "' and objectID not in (" + wbsIdOutputWithQuotes + ")",
            // query = cds.parse.cql(sQuery)
            query = (sQuery)

        // let notPresentActivityID1 = await tx.run(query)
        let notPresentWBSID = await tx.run(query)

        if (notPresentWBSID.length > 0) {
            for (i = 0; i < notPresentWBSID.length; i++) {
                await tx.run(UPDATE(WBS).set({
                    deleted: 'true'
                }).where({
                    projectID: paraProjectID,
                    objectID: notPresentWBSID[i].objectID
                })).then(affectedRows => {
                    console.log('Number of wbsID updated: ' + affectedRows)
                })
            }

        }

        return {
            result: 'Deleted flag updated to True for ' + notPresentWBSID.length + ' records'
        }

    })

    // updating deleted flag in activity table to true for all records which are present in CAP but not in primavera P6 system
    //Below function is triggered by CPI iFLow
    srv.on('setDeletedResourceID', async (req) => {
        const paraProjectID = req.data.sProjectId
        const paraResourceID = req.data.sResourceIDs
        let tx = cds.transaction(req)

        var rID = req.data.sResourceIDs;
        var resID = paraResourceID.split("~");
        var Res = [];
        var Act = [];
        var ActID = [];
        var stmtCon = [];

        for (i = 0; i < resID.length; i++) {
            var empty1 = [];
            var empty2 = [];

            empty1 = resID[i].slice(0, resID[i].indexOf("("));
            Res.push("'" + empty1 + "'");
            // Res.push(resID[i].slice(0, resID[i].indexOf("(")));

            Act.push(resID[i].slice(resID[i].indexOf("(") + 1, -1));

            // empty2 = resID[i].slice(resID[i].indexOf("(")+2,-2);
            // Act.push(empty2.split(',').join("','"));
        }
        for (k = 0; k < Act.length; k++) {
            var resourceIdOutput = Act[k].split(',');
            ActID.push("'" + resourceIdOutput.join("','") + "'");
            //ActID.push(resourceIdOutput.join("','"));
        }

        for (j = 0; j < resID.length; j++) {
            // var resourceIdOutput = Act[j].split(',');
            // ActID.push("'" + resourceIdOutput.join("','") + "'");
            //ActID.push(resourceIdOutput.join("','"));
            if ((j + 1) == Res.length) {
                stmtCon = stmtCon + "(activityID not in (" + ActID[j] + ") and resourceID in (" + Res[j] + "))";
            } else {
                stmtCon = stmtCon + "(activityID not in (" + ActID[j] + ") and resourceID in (" + Res[j] + ")) or ";
            }
        }

        let sQuery = "select projectID, resourceID, activityID  from COM_LTI_PRIMAVERA_INTEGARTION_RESOURCE WHERE projectID='" + paraProjectID + "'  and " + stmtCon
        // query = cds.parse.cql(sQuery)
        query = (sQuery)

        console.log('sQuery:: ' + sQuery)
        // let notPresentActivityID1 = await tx.run(query)
        let notPresentResourceID = await tx.run(query)


        let notPresentRecordID = await tx.run(query)
        if (notPresentRecordID.length > 0) {
            for (i = 0; i < notPresentRecordID.length; i++) {
                await tx.run(UPDATE(Resource).set({
                    deleted: 'true'
                }).where({
                    projectID: paraProjectID,
                    activityID: notPresentRecordID[i].activityID,
                    resourceID: notPresentRecordID[i].resourceID
                })).then(affectedRows => {
                    console.log('Number of activityID updated:: ' + affectedRows)
                })
            }
        }

        return {
            result: 'Deleted flag updated to True for ' + notPresentRecordID.length + ' records'
        }
    })

	/*	srv.on('setDeletedResourceID', async(req) => {

			const paraProjectID = req.data.sProjectId
			const paraResourceID = req.data.sResourceIDs
			const paraActivityID = req.data.sActivityIDs

			let tx = cds.transaction(req)

			var resourceIdOutput = paraResourceID.split(',');
			const resIdOutputWithQuotes = "'" + resourceIdOutput.join("','") + "'"

			var activityIDOutput = paraActivityID.split(',');
			const actIDOutputWithQuotes = "'" + activityIDOutput.join("','") + "'"
			console.log(Resource['@cds.persistence.name']);
			
			let sQuery = "select projectID, resourceID, activityID  from " + Resource['@cds.persistence.name'] +
				" WHERE projectID='" + paraProjectID + "' and (( activityID not in (" + actIDOutputWithQuotes + ") and resourceID in (" +
				resIdOutputWithQuotes + ")) or ( activityID in (" + actIDOutputWithQuotes + ") and resourceID not in (" +
				resIdOutputWithQuotes + ")))",
                // query = cds.parse.cql(sQuery)
                query = (sQuery)

			// let notPresentActivityID1 = await tx.run(query)
			let notPresentResourceID = await tx.run(query)

			if (notPresentResourceID.length > 0) {
				for (i = 0; i < notPresentResourceID.length; i++) {
					for (j = 0; j < resourceIdOutput.length; j++) {
						await tx.run(UPDATE(Resource).set({
							deleted: 'true'
						}).where({
							projectID: paraProjectID,
							activityID: notPresentResourceID[i].activityID,
							resourceID: resourceIdOutput[j]
						})).then(affectedRows => {
							console.log('Number of activityID updated:: ' + affectedRows)
						})
					}
				}
			}

			return {
				result: 'Deleted flag updated to True for ' + notPresentResourceID.length + ' records'
			}

		})*/

    srv.on('jobSchedulerPrimaActivity', async (req) => {

        const paraProjectID = req.data.projectID
        const paraWBSID = req.data.wBSID
        const paraActivityID = req.data.activityID

        let activityWithProgress = []

        let tx = cds.transaction(req)

        let activityData = await tx.run(SELECT.from(activity, primaAct => {
            primaAct.projectID,
                primaAct.wBSID,
                primaAct.activityID,
                primaAct.perForPercentComplete
        }).where({
            projectID: paraProjectID,
            wBSID: paraWBSID,
            activityID: paraActivityID
        }))

        console.log('total activity items to process: ' + activityData.length)
        activityData.forEach(activityItems => {
            record = {}
            record.projectID = activityItems.projectID
            record.wBSID = activityItems.wBSID
            record.activityID = activityItems.activityID
            record.perForPercentComplete = activityItems.perForPercentComplete
            activityWithProgress.push(record)
        })

        console.log("total activity items  " + activityWithProgress.length)
        if (activityWithProgress.length > 0) {

            await tx.run(INSERT.into(pvActivityJS).entries(activityWithProgress))
            debugmessage = 'Inserted successfully ' + activityWithProgress.length + ' rows in pvActivityJS'
            console.log(debugmessage)
        }

        return {
            result: activityWithProgress
        }
    })

}

