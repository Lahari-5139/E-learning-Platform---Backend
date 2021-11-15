const User = require("./../models/user");
const Token = require("./../models/token");
const sendEmail = require("./../utils/sendEmail");
const crypto = require("crypto");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/", async(req, res) => {
    console.log("in password-reset");
    let { email } = req.body;
    email = email;
    if (email == "") {
        res.json({
          status: "FAILED",
          message: "Empty credentials supplied",
        });
      }
      else {
        console.log(`${email}`);
        User.find({ email })
          .then((data) => {
            if (data.length) {
              // User exists
              console.log(`${data}`);
              Token.find({ userId: data[0]._id })
                .then((token) =>{
                    if(token.length){
                        console.log("Token exists");
                        console.log(`${token}`);
                    }
                else{
                    token = new Token({
                        userId: data[0]._id,
                        token: crypto.randomBytes(32).toString("hex"),
                    }).save();
                    console.log(`Token created is ${token[0].token}`);
                }
                // console.log(`${token}`);
                console.log(`Token is ${token[0].token}`);
        const link = `http://localhost:3000/password-reset/${data[0]._id}/${token[0].token}`;
        sendEmail(data[0].email, "Password reset", link);
        // res.send("password reset link sent to your email account");
        res.json({
            status: "Success",
            message: "Password reset link sent to your email account",
          });
    })
.catch((err) =>{
    res.json({
        status: "FAILED",
        message: "An error occurred while sending reset link",
      });

})
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

router.post("/:userId/:token", (req, res) => {
    let { password } = req.body;
    password = password;
    if (password == "") {
        res.json({
          status: "FAILED",
          message: "new password is empty",
        });
      }
      else{
          User.find({_id: req.params.userId})
          .then((data) =>{
            if (data.length) {
                // User exists
                console.log(`${data}`);
                data[0].password = password;
                data[0].save();
                res.json({
                    status: "SUCCESS",
                    message: "Password Reset successful",
                    data: data,
                  });

          }
          else {
            res.json({
                status: "FAILED",
                message: "User Doesnt exist",
              });
          }
      })
      .catch((err) => {
        res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user",
          });
      })
    }
//     try {
//         const schema = Joi.object({ password: Joi.string().required() });
//         const { error } = schema.validate(req.body);
//         if (error) return res.status(400).send(error.details[0].message);

//         const user = await User.findById(req.params.userId);
//         if (!user) return res.status(400).send("invalid link or expired");

//         const token = await Token.find({
//             userId: user._id,
//             token: req.params.token,
//         });
//         if (!token) return res.status(400).send("Invalid link or expired");

//         user.password = req.body.password;
//         await user.save();
//         await token.delete();

//         res.send("password reset sucessfully.");
//     } catch (error) {
//         res.send("An error occured");
//         console.log(error);
//     }
});

module.exports = router;