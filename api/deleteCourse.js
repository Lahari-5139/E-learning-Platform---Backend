const express = require("express");
const router = express.Router();

// const User = require("./../models/user");
const Master = require("./../models/master");
const Course = require("./../models/course");
const Admin = require("./../models/admin");
const User = require("./../models/user");

router.post("/", (req, res) => {
    let {email, name} = req.body; //name is the course name
    email = email;
    name = name;
    // description = description;
    if (name == "" || email == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
    }
    else {
        Admin.find({email})
        .then((result) => {
            Course.deleteOne({name});
            // .then((resultcourse) => {
            // })
            res.json({
                status: "SUCCESS",
                message: "course deleted successfully",
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
              status: "FAILED",
              message: "An error occurred while checking for existing user!",
            });
          });
    }
});

module.exports = router;

