"use strict"
/*

BLOG api project ROUTS

*/
const router=require('express').Router()
const {BlogPost}=require('../controllers/blogCotroller')

router.route('/post')
    .get(BlogPost.list)
    .post(BlogPost.create)


router.route('/post/:postId')
    .get(BlogPost.read)
    .put(BlogPost.update)
    .delete(BlogPost.delete)

module.exports=router