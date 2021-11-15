const express = require("express");
const router = express.Router();

// const User = require("./../models/user");
const Master = require("./../models/master");
const Report = require("./../models/report");
// const Course = require("./../models/course");

router.post("/", (req, res) => {
    let{email, description} = req.body;
    email = email;
    description = description;
    if (email == "" || description == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
    }
    else {
        Master.find({email})
        .then((result) => {
            userRef = result[0]._id;
            const newReport = new Report({
                userRef,
                description,
            });
            newReport.save(function(err, result) {
                if (err){
                    console.log(err);
                    res.json({
                            status: "FAILED",
                            message: "An error occurred while reporting!",
                          });
                }
                else {
                    res.json({
                        status: "SUCCESS",
                        message: "Reported successfully",
                        data: result,
                      }); 
                }
            })
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