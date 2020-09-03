var moment = require('moment');


function missing(req, res, next){
    var holidays=['03-aug-2020'];

    var fdate = "2020-07-31";
        var fromdate = moment(fdate).format('DD-MMM-YYYY');
        console.log(fromdate);
        
        var tdate = new Date();
         var todate=moment(tdate).format('DD-MMM-YYYY');
        console.log(todate);

    try{
            for (var m = moment(fromdate); m.isBefore(todate); m.add(1, 'days')) {

                let day=m.day();
                if(day!=0 && day!=6)
                {
                    holidays.forEach((date)=>{
                        var hd = new Date(date);
                       if(hd.valueOf()!=m.valueOf())
                       {
                           console.log(m.format('DD-MMM-YYYY'));
                       }
                    })
                }
            }
        
    }
    catch(err){
    console.log(err);
    }
}

module.exports={
    missing
}
