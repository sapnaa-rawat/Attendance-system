var leaves = require('../model/leavesModel');
var resource = require('../model/resource');

async function applyLeave(req, res) {
    const day = req.body.date;
    // Got email from validated token stored in req.user
    const email = req.user.email;
    try {
        const { id } = await resource.findOne({ email: email });
        const leave = new leaves({
            empid: id,
            appliedOn: day
        });
        leave.save()
            .then(doc => res.status(201).send({ message: "Leave applied." }))
            .catch(err => res.status(500).send({ message: "An error occured.", error: err }));
    } catch (error) {
        res.status(404).send({ message: "Employee id found." });
    }
}

async function getAll(req, res) {
    try {
        var allLeaves = await leaves.findAllLeavesById(req.user.id);
        res.status(200).send({ leaves: allLeaves });
    }
    catch (error) {
        res.status(500).send({ message: "An error occured.", error: `${error}` });
    }
}

module.exports = { applyLeave, getAll };