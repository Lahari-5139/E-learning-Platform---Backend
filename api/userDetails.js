const express = require("express");
const router = express.Router();

const User = require("./../models/user");
const Master = require("./../models/master");
const Course = require("./../models/course");

router.get("/viewProfile", (req, res) => {
    console.log("In code");
    let {email} = req.body;
    email = email;
    if (email == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
  
    }
    else {
        User.find({email})
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

router.get("/viewCourses", (req, res) => {
    let {email} = req.body;
    email = email;
    if (email == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
  
    }
    else {
        User.find({email})
        .then((result) => {
            var courses =  result[0].courses_enrolled;
            console.log(courses);
              res.setHeader('Content-Type', 'text/json');
            // res.status(200).send(result);
            courses.forEach( function (eachcourse) {
                res.write(eachcourse);
            });
            res.end();
        })
        .catch(error => res
            .status(400)
            .send(error));
    }

});

module.exports = router;