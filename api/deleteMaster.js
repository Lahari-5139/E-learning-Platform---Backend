const express = require("express");
const router = express.Router();

// const User = require("./../models/user");
const Master = require("./../models/master");
const Course = require("./../models/course");
const Admin = require("./../models/admin");
const User = require("./../models/user");

router.post("/", (req, res) => {
    let {adminemail, email} = req.body; //name is the course name
    email = email;
    adminemail = adminemail;
    // description = description;
    if (adminemail == "" || email == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
    }
    else {
        Admin.find({adminemail})
        .then((result) => {
            Master.deleteOne({email});
            // .then((resultcourse) => {
            // })
            res.json({
                status: "SUCCESS",
                message: "User deleted successfully",
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