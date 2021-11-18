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
const UserDetailsRouter = require('./api/userDetails');
const MasterDetailsRouter = require('./api/masterDetails');
const DeleteCourseRouter = require('./api/deleteCourse');
const DeleteMasterRouter = require('./api/deleteMaster');
const DeleteUserRouter = require('./api/deleteUser');
const UnenrollCourseRouter = require('./api/unenrollCourse');
const UnfollowMasterRouter = require('./api/unfollowMaster');

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
app.use("/userDetails", UserDetailsRouter);
app.use("/masterDetails", MasterDetailsRouter);
app.use("/deleteCourse", DeleteCourseRouter);
app.use("/deleteMaster", DeleteMasterRouter);
app.use("/deleteUser", DeleteUserRouter);
app.use("/unenrollCourse", UnenrollCourseRouter);
app.use("/unfollowMaster", UnfollowMasterRouter);


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})