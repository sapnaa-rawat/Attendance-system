const holidayList = require("../model/holiday");
const moment=require("moment")
holiday=(req,res)=>{
    const date=req.body;

let holidays=holidayList({
    holidayDate:date,
   
});
holidays.save().then(doc=> res.status(201).json({"message":"date added"})).catch(err=>{res.status(404).json({"message":"invalid data"})})
}


validate=(req,res,next)=>{
    if(!req.body){
        return res.status(422).json({message:"please provide email or occasion"});
    }
    next();
}
module.exports={
    holiday,
    validate
}