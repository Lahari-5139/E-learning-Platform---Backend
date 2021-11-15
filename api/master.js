
const express = require("express");
const router = express.Router();

// mongodb user model
const Master = require("./../models/master");

// Password handler
// const bcrypt = require("bcrypt");

// Signup
router.post("/signup", (req, res) => {
  let { name, email, password} = req.body;
  name = name;
  email = email;
  password = password;

  if (name == "" || email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty input fields!",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
//   } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
//     res.json({
//       status: "FAILED",
//       message: "Invalid email entered",
//     });
//   } else if (!new Date(dateOfBirth).getTime()) {
//     res.json({
//       status: "FAILED",
//       message: "Invalid date of birth entered",
//     });
//   } else if (password.length < 8) {
//     res.json({
//       status: "FAILED",
//       message: "Password is too short!",
//     });
  } else {
    // Checking if user already exists
    Master.find({ email })
      .then((result) => {
        if (result.length) {
          // A user already exists
          res.json({
            status: "FAILED",
            message: "Master with the provided email already exists",
          });
        } else {
          // Try to create new user

          // password handling
        //   const saltRounds = 10;
        //   bcrypt
        //     .hash(password, saltRounds)
            // .then((hashedPassword) => {
              const newMaster = new Master({
                name,
                email,
                password,
              });

              newMaster
                .save()
                .then((result) => {
                  res.json({
                    status: "SUCCESS",
                    message: "Signup successful",
                    data: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "FAILED",
                    message: "An error occurred while saving user account!",
                  });
                });
        }
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

// Signin
router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email;
  password = password;

  if (email == "" || password == "") {
    res.json({
      status: "FAILED",
      message: "Empty credentials supplied",
    });
  } else {
    // Check if user exist
    console.log(`${email}`);
    Master.find({ email })
      .then((data) => {
        if (data.length) {
          // User exists
          console.log(`${data}`);

          let hashedPassword = data[0].password;
          console.log(`${hashedPassword}`);
          console.log(`${password}`);
          console.log(`${password.localeCompare(hashedPassword)}`);
        //   bcrypt
        //     .compare(password, hashedPassword)
        let result = password.localeCompare(hashedPassword)
            // .then((result) => {
                console.log(`${result}`);
              if (!result) {
                // Password match
                res.json({
                  status: "SUCCESS",
                  message: "Signin successful",
                  data: data,
                });
              } else {
                res.json({
                  status: "FAILED",
                  message: "Invalid password entered!",
                });
              }
            // })
            // .catch((err) => {
            //   res.json({
            //     status: "FAILED",
            //     message: "An error occurred while comparing passwords",
            //   });
            // });
        } else {
          res.json({
            status: "FAILED",
            message: "Invalid credentials entered!",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "FAILED",
          message: "An error occurred while checking for existing user",
        });
      });
  }
});

module.exports = router;