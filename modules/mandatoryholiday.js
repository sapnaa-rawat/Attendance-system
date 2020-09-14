const holidayList = require("../model/holiday");
const moment=require("moment")
holiday=(req,res)=>{
    const {date,occasion}=req.body;

let holidays=holidayList({
    holidayDate:date,
    occasion:occasion
});
console.log(holidays)
holidays.save().then(doc=> res.status(201).json({"message":"date added"})).catch(err=>{res.status(404).json({"message":"invalid data"})})
}


validate=(req,res,next)=>{
    if(!req.body.date & !req.body.occasion ){
        return res.status(422).json({message:"please provide email or occasion"});

    }
    else if(moment(req.body.date, 'DD-MMM-YYYY').isAfter('31-jul-2020')){
    next();
    }
    else{
        res.status(422).json({message:"invalid date"})
    }
}
module.exports={
    holiday,
    validate
}