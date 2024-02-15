"use strict"
/*

BLOG api project MODELS

*/
require('express-async-errors')

const {BlogPost, BlogCategory} =require('../models/blogModel')

/*
BLOG POST Controllers
*/

module.exports.BlogPost={
    list: async(req,res)=>{
        
        //const data = await BlogPost.find()
        const data = await res.getModelList(BlogCategory)
     console.log(data)

        res.status(200).send({
            error:false,
           // details: await res.getModelListDetails(BlogPost),
            data: data
        })
    },

    create: async(req, res)=>{
        //
        const data= await BlogPost.create(req.body)
        // console.log('*****');
        // console.log(req.body);
        res.status(200).send({
            error:false,
            body: req.body,
            data: data
            
        })
    },
    read: async(req,res)=>{
        //
        const data= await BlogPost.findOne({_id:req.params.postId}).populate("blogCategoryId")
        res.status(200).send({
            error:false,
            data: data
        })
    },
    update: async(req,res)=>{
        //
        const data= await BlogPost.updateOne({_id:req.params.postId},req.body)

        res.status(200).send({
            error:false,
            data: data
        })
    },
    delete: async(req,res)=>{
        //
        const data= await BlogPost.deleteOne({_id:req.params.postId})
        // console.log(data);
        res.status((data.deletedCount>=1) ? 204: 404 ).send({
            error:false,
        })
    }
}
//blogcategorty

module.exports.BlogCategory ={
    //GET
    list:async(req,res)=>{
       // const data =await BlogCategory.find()
       const data =await res.getGetModelList(BlogCategory)
        res.status(200).send({
            error:false,
            data
        })

    },
//post
    create:async(req,res)=>{
        const data =await BlogCategory.create(req.body)
        res.status(201).send({
            error:false,
            body:req.body,
            data
        })
    },
    //GET/:categotyid

    read:async(req,res)=>{
        const data = await BlogCategory.findOne({_id:req.params.categoryId})


    },
    //PUT

    update:async(req,res)=>{
        const data = await BlogCategory.updateOne({_id:req.params.categoryId},req.body)
res.status(202).send({
    error:false,
    newData :await BlogCategory.findOne({_id:req.params.categoryId})
})
    },
    //DELETE

    delete:async(req,res)=>{
        const data = await BlogCategory.deleteOne({_id:req.params.categoryId})
    },
}