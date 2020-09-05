var moment = require('moment');
var attendanceschema=require('../model/attendance');

async function missing(req, res, next){
    var id=req.body.empid;

    var holidays=['03-aug-2020', '02-oct-2020', '13-nov-2020', '30-nov-2020', '25-dec-2020'];
    var missingdates=[];

         var fdate = "2020-07-31";
        var fromdate = moment(fdate).format('DD-MMM-YYYY');
        
        var tdate = new Date();
         var todate=moment(tdate).format('DD-MMM-YYYY');

        try{
                for (var m = moment(fromdate); m.isBefore(todate); m.add(1, 'days')) {
                    var hd=null;
                    let key=false;
                    let day=m.day();
                    if(day!=0 && day!=6)
                    {
                        holidays.forEach((date)=>{
                            hd = new Date(date);
                        if(hd.valueOf()===m.valueOf())
                        {
                            key=true;
                        } 
                        })

                        if(key===false){
                        
                        if(id!=undefined){
                        var data=await attendanceschema.findOne({$and:[{empid: id, date:m.format("DD-MMM-YYYY")}]});
                            if(data==null){
                            var obj = {};
                            obj[id]=m.format('DD-MMM-YYYY')
                            missingdates.push(obj);
                            }
                        
                            }
                            if(id===undefined){
                                var data=await attendanceschema.find({project:true});
                                    if(data==null){
                                        var obj = {};
                                        obj[id]=m.format('DD-MMM-YYYY')
                                        missingdates.push(obj);
                                        }
                             }
                      }
                    }
                }
                console.log(typeof(id));
                console.log(id);
                console.log(missingdates);
                res.status(200).json({"empid":missingdates});
        }
        catch(err){
        console.log(err);
        }
     
}

module.exports={
    missing
}
