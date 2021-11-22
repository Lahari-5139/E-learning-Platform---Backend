const express = require("express");
const router = express.Router();

const User = require("./../models/user");
const Master = require("./../models/master");
// const Course = require("./../models/course");

router.post("/", (req, res) => {
    let {userEmail, masterEmail} = req.body; //name is the course name
    userEmail = userEmail;
    masterEmail = masterEmail;
    // description = description;
    if (userEmail == "" || masterEmail == "") {
        res.json({
          status: "FAILED",
          message: "Empty input fields!",
        });
    }
    // else if (!/^[a-zA-Z ]*$/.test(name)) {
    //     res.json({
    //       status: "FAILED",
    //       message: "Invalid name entered",
    //     });
    // }
    else {
      console.log(userEmail);
      console.log(masterEmail);
      let email = userEmail;
        User.find({email})
        .then((resultuser) => {
          let email =  masterEmail;
            Master.find({email})
            .then((resultmaster) => {
              console.log(userEmail);
      console.log(masterEmail);
      console.log(resultuser);
      console.log(resultmaster);
                let checkflag = false;
                resultuser[0].masters_followed.forEach( function (eachmaster) {
                    // console.log(eachmaster);
                    // console.log(resultmaster[0]._id);
                    if(eachmaster.toString() == resultmaster[0]._id.toString()) {
                        checkflag = true;
                        console.log("Yess!");
                        res.json({
                            status: "FAILED",
                            message: "Master already following!",
                          });
                    }
                })
                if( checkflag == false)
                {
                resultuser[0].masters_followed.push(resultmaster[0]._id);
                resultuser[0].save();
                res.json({
                    status: "SUCCESS",
                    message: "master followed successfully",
                  });
                }
            })
            .catch((err) => {
                console.log(err);
                res.json({
                  status: "FAILED",
                  message: "An error occurred while checking for existing master!",
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