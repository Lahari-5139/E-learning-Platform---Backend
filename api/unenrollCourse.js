const express = require("express");
const router = express.Router();

const User = require("./../models/user");
// const Master = require("./../models/master");
const Course = require("./../models/course");

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
    else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
          status: "FAILED",
          message: "Invalid name entered",
        });
    }
    else {
        User.find({email})
        .then((resultuser) => {
            Course.find({name})
            .then((resultcourse) => {
                let checkflag = false;
                resultuser[0].courses_enrolled.forEach( function (eachcourse) {
                    console.log(eachcourse);
                    console.log(resultcourse[0]._id);
                    if(eachcourse.toString() == resultcourse[0]._id.toString()) {
                        checkflag = true;
                        console.log("Yess!");
                        resultuser[0].courses_enrolled.pull(resultcourse[0]._id);
                        resultuser[0].save();
                        res.json({
                            status: "SUCCESS",
                            message: "course unenrolled successfully",
                        });
                        const message = `Course ${resultcourse[0].name} unenrolled!`;
                        resultuser[0].notifications.push(message);
                    }
                })
                if( checkflag == false)
                {
                  res.json({
                    status: "FAILED",
                    message: "Course not enrolled",
                  });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                  status: "FAILED",
                  message: "An error occurred while checking for existing course!",
                });
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