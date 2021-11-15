const express = require("express");
const router = express.Router();

// const User = require("./../models/user");
const Master = require("./../models/master");
const Course = require("./../models/course");

router.post("/", (req, res) => {
    let {email, name, description} = req.body;
    email = email;
    name = name;
    description = description;
    if (name == "" || email == "" || description =="") {
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
        Master.find({email})
        .then((result1) => {
          console.log(`master is ${result1}`);
                master = result1[0]._id;
                //create a new course
                console.log(`${master}`);
                const newCourse = new Course({
                    name,
                    master,
                    description,
                });
                console.log(`course is ${newCourse}`);
                // newCourse
                //   .save()
                //   .then((result) => {
                //     console.log(`result course is ${result}`);
                //     res.json({
                //         status: "SUCCESS",
                //         message: "course added successful",
                //         data: result,
                //       }); 
                //     // $pushresult1[0].courses: course;
                //     Master.updateOne( { email : email },{ $push: { courses: result[0]._id } });
                //     // result1[0].save(); 
                //   })
                //   .catch((err) => {
                //     res.json({
                //       status: "FAILED",
                //       message: "An error occurred while saving course!",
                //     });
                //   }); 
                newCourse.save(function(err,result){
                  if (err){
                      console.log(err);
                      res.json({
                              status: "FAILED",
                              message: "An error occurred while saving course!",
                            });
                  }
                  else{
                      console.log(result);
                      console.log(newCourse._id);
                      console.log(email);
                      // Master.updateOne( { email : email },{ $push: { courses: {"courseid": newCourse._id} } });
                      result1[0].courses.push(newCourse._id);
                      result1[0].save();
                      console.log(result1);
                      res.json({
                                status: "SUCCESS",
                                message: "course added successfully",
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