const dataModel = require('../model/resource');

const deleteUser = (req, res) => {
    const currentuserid = req.body.id;
    if (currentuserid == undefined) {
        return res.status(422).send("provide a valid user id to delete")
    }
    else {
        dataModel.findOneAndUpdate({ 'id': currentuserid }, { $set: { 'deleted': true } }).exec(function (error) {
            if (error) {
                return res.status(404).send('something went wrong');
            }
            return res.status(200).send({ msg: "user deleted" });
        })
    }

}

module.exports = {
    deleteUser
}