
const router=require('express').Router()


const { User } = require("../controllers/userController")
router.post("/login",User.login)
router.get("/logout",User.logout)
router.route("/")
.get(User.list)
.post(User.create)
router.route("/:id")
.get(User.read)
.put(User.update)



module.exports=router