const moment = require('moment');
const attendanceschema = require('../model/attendance');

var missing = async (req, res, next) => {
    var id = req.body.empid;

    var holidays = ['03-aug-2020', '02-oct-2020', '13-nov-2020', '30-nov-2020', '25-dec-2020'];
    var missingdates = [];
    var key2 = false;

    var fdate = "2020-07-31";
    var fromdate = moment(fdate).format('DD-MMM-YYYY');

    var tdate = new Date();
    var todate = moment(tdate).format('DD-MMM-YYYY');

    var data1 = await attendanceschema.find();
    var temp = [];

    data1.forEach((record) => { temp.push(record.empid) });


    try {

        for (start = 0; start < temp.length; start++)
            if (temp[start] !== temp[start - 1]) {
                idemp = temp[start];
                if (id === undefined) {
                    missingdates.push({ "empid": idemp })
                }
                for (var m = moment(fromdate); m.isSameOrBefore(todate); m.add(1, 'days')) {
                    var hd = null;
                    let key = false;
                    let day = m.day();
                    if (day != 0 && day != 6) {
                        holidays.forEach((date) => {
                            hd = new Date(date);
                            if (hd.valueOf() === m.valueOf()) {
                                key = true;
                            }
                        })

                        if (key === false) {

                            if (id != undefined) {
                                if (key2 == false) {
                                    var data = await attendanceschema.findOne({ $and: [{ empid: id, date: m.format("DD-MMM-YYYY") }] });
                                    if (data == null) {
                                        var obj = {};
                                        obj = m.format('DD-MMM-YYYY')
                                        missingdates.push(obj);
                                    }
                                }
                            }

                            if (id === undefined) {
                                var data = await attendanceschema.find({ $and: [{ empid: idemp, project: true, date: m.format("DD-MMM-YYYY") }] });
                                if (data.length == 0) {
                                    var obj = {};
                                    obj = m.format('DD-MMM-YYYY')
                                    missingdates.push(obj);
                                }
                            }
                        }
                    }

                }
                key2 = true;
            }
        console.log(missingdates);
        res.status(200).json({ AttendancesMissing: { "date": missingdates, "empid": id } });

    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {
    missing
}
