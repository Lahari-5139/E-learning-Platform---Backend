//mongodb
require('./config/db');

const app = require('express')();
const port = 3000;

const UserRouter = require('./api/user');
const MasterRouter = require('./api/master');
const PasswordRouter = require('./api/passwordReset');
const CreateCourseRouter = require('./api/createCourse');
const EnrollCourseRouter = require('./api/enrollCourse');
const FollowMasterRouter = require('./api/followMaster');
const UserReportRouter = require('./api/userReportBug');
const MasterReportRouter = require('./api/masterReportBug');
const userDetailsRouter = require('./api/userDetails');
const masterDetailsRouter = require('./api/masterDetails');

// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());

// app.use('/user', UserRouter)

app.use("/user", UserRouter);
app.use("/password-reset", PasswordRouter);
app.use("/createCourse", CreateCourseRouter);
app.use("/master", MasterRouter);
app.use("/enrollCourse", EnrollCourseRouter);
app.use("/followMaster", FollowMasterRouter);
app.use("/userReport", UserReportRouter);
app.use("/masterReport", MasterReportRouter);
app.use("/userDetails", userDetailsRouter);
app.use("/masterDetails", masterDetailsRouter);


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})