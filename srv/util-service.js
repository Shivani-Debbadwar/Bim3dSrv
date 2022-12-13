const cds = require('@sap/cds')

module.exports = (srv) => {

    srv.on('getUser', async (req) => {

        if (!req.user) {
            return 'Missing user'
        } else {
            // res.statusCode = 200;
            return req.user.id;
        }
    })

    srv.on('getUserAttr', async (req) => {
        if (!req.user) {
            return 'Missing user'
        } else {
            // res.statusCode = 200;
            if (req.user.is('system-user')) {
                return ["*"]
            } else {
                if (req.user.attr.projectAccess === undefined) {
                    var arr = ["*"];
                    return arr;
                } else {
                    return req.user.attr.projectAccess;
                }
            }


        }
    })

    srv.on('getUserRole', async (req) => {
        console.log(req.user)
        if (!req.user) {
            return 'Missing user'
        } else if (req.user.is('Estimation_Engineer') && req.user.is('Planning_Engineer') && req.user.is('Commercial_Engineer') && req.user.is('PlanSyncAdmin')) {
            return 'Super Admin'
        } else if (req.user.is('Estimation_Engineer') && req.user.is('Planning_Engineer') && req.user.is('Commercial_Engineer')) {
            return 'Budgetor'
        } else if (req.user.is('Estimation_Engineer') && req.user.is('Commercial_Engineer') && req.user.is('PlanSyncAdmin')) {
            return 'Estimator'
        } else if (req.user.is('Estimation_Engineer') && req.user.is('Commercial_Engineer')) {
            return 'Estimate Budgetor'
        } else if (req.user.is('Estimation_Engineer')) {
            return 'Estimation Engineer'
        } else if (req.user.is('Planning_Engineer')) {
            return 'Planning Enginner'
        } else if (req.user.is('Commercial_Engineer')) {
            return 'Commercial Engineer'
        } else if (req.user.is('PlanSyncAdmin')) {
            return 'Admin'
        } else {
            return 'No Roles Assigned'
        }
    })
}