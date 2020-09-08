const dataModel=require('../model/resource');
const moment=require('moment');


function addUsertoProject(req,res){
    const currentuserid=req.body.id;
    if(currentuserid==undefined){
        return res.status(422).send("provide a valid user id to add that user to project")
    }
    else{
        dataModel.findOneAndUpdate({'id':currentuserid},{$set:{'project':true}}).exec(function(error){
            if(error){
                return res.status(404).send('something went wrong');
            }
            return res.status(200).send({msg:"user Added to the project"});
        })
    }
    
}

module.exports={
    addUsertoProject
}