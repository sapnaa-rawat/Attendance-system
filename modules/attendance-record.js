const attendances = require('../model/attendance');

const markAttendance = async (req, res) => {
  const body = req.body;
  const queryMap = body.map(async (item) => {
      return await attendances.findOneAndUpdate({
        "empid": item.empid,
        "date": item.date
      }, {$set: {empattendance: item.empattendance}}, {upsert: true, returnOriginal: false});
  });
  Promise.all(queryMap).then(([...results]) => res.status(200).send({"message":"ok",results})).catch((err) => res.status(200).send(err));
}


module.exports = {
  markAttendance
}
