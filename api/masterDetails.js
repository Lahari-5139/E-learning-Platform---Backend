const express = require("express");
const router = express.Router();

const User = require("./../models/user");
const Master = require("./../models/master");
const Course = require("./../models/course");

router.get("/viewProfile", (req, res) => {
    let {email} = req.body;
    email = email;
    if (email == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
  
    }
    else {
        Master.find({email})
        .then((result) => {
            var username = result[0].name;
            var useremail = result[0].email;
            var courses =  result[0].courses_enrolled;
            console.log(username);
            console.log(useremail);
            console.log(courses);
            res.status(200).send(result);
        })
        .catch(error => res
            .status(400)
            .send(error));
    }
});

module.exports = router;