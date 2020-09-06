const dataModel=require('../model/resource');
const moment=require('moment');


function deleteUser(req,res){
    const currentuserid=req.body.id;
    dataModel.findOneAndUpdate({'id':currentuserid},{$set:{'project':true}}).exec(function(error){
        if(error){
            return res.status(404).send('something went wrong');
        }
        return res.status(200).send({msg:"user Added to the project"});
    })
}

module.exports={
    deleteUser
}