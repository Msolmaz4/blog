
const { User } =require("../models/userModel")
const passwordEncrypt = require('../helper/passwordEncrypt')

module.exports.User ={
    //GET
    list:async(req,res)=>{
      //  const data =await User.find()
        const data = await res.getModelList(User)
        res.status(200).send({
            error:false,
            data
        })

    },
//post
    create:async(req,res)=>{
        console.log(req.body)
        const data =await User.create(req.body)
        res.status(201).send({
            error:false,
            body:req.body,
            data
        })
    },
    //GET/:categotyid

    read:async(req,res)=>{
        const data = await User.findOne({_id:req.params.userId})


    },
    //PUT

    update:async(req,res)=>{
        const data = await User.updateOne({_id:req.params.userId},req.body)
res.status(202).send({
    error:false,
    newData :await User.findOne({_id:req.params.userId})
})
    },
    //DELETE

    delete:async(req,res)=>{
        const data = await User.deleteOne({_id:req.params.userId})
    },

    login:async(req,res)=>{
        const {email,password}= req.body
        if(email && password){
            const user =await User.findOne({email:email})
           // && passwordEncrypt(password) == user.password 
            if(user ){
                req.session = {email:user.email ,password:user.password}
                if(req.body.remindMe){
                    req.sessionOptions.maxAge =100*60*12
                }
                res.send({
                    message:"logined"
                })
            }else{
                res.errorStatusCode=401
            throw new Error("email and password not true")
            }

        }
        else{
            res.errorStatusCode=401
            throw new Error("email and password are required")
        }

    },
    logout:async(req,res)=>{
        req.session = null
        res.status(200).send({
            message:"logout"
        })

    },
}