"use strick";

const mongoose = require("mongoose");
const crypto = require("node:crypto");

const keyCode = "write"
const loop = "32"
const charCount = 32 // cikis sayisi 
const encType = "sha512"

// const passwordEncrypt = function (password){
//     return crypto.pbkdf2Sync(password,keyCode,loop,charCount,encType).toString("hex")
// }
// console.log(passwordEncrypt("23589441"))
const passwordEncrypt = require('../helper/passwordEncrypt')
const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email muss"],
      //validate:()=>{}
      validate: [
        (email) => {
          if (email.includes("@") && email.includes(".")) return true;
          else return false;
        },
        "email type keine",
      ],
      //    validate:[
      //     (email)=> (email.includes("@") && email.includes("."))

      //     "email type keine"
      //    ]
    },
    password: {
      type: String,
      trim: true,
      required: true,
      //set medou eklemem
     // set: (password) => passwordEncrypt(password)
    },
  },
  {
    collection: "users",
  }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
};
