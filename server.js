//mongodb
require('./config/db');

const app = require('express')();
const port = 3000;

const cors = require('cors');
const cookieParser = require('cookie-parser');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200 
}
const http = require('http').createServer(app);
// const mongoose = require('mongoose');
const socketio = require('socket.io')
const io = socketio(http,{
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
}); 
const { addUser, getUser, removeUser } = require('./utils/chat');
const Message = require('./models/message');
const PORT = process.env.PORT || 5000;
const Room = require('./models/room');

io.on('connection', (socket) => {
    console.log(socket.id);
    Room.find().then(result => {
        socket.emit('output-rooms', result)
    })
    socket.on('create-room', name => {
        const room = new Room({ name });
        room.save().then(result => {
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('join error', error)
        } else {
            console.log('join user', user)
        }
    })
    socket.on('sendMessage', (message, room_id, callback) => {
        const user = getUser(socket.id);
        const msgToStore = {
            name: user.name,
            user_id: user.user_id,
            room_id,
            text: message
        }
        console.log('message', msgToStore)
        const msg = new Message(msgToStore);
        msg.save().then(result => {
            io.to(room_id).emit('message', result);
            callback()
        })

    })
    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            socket.emit('output-messages', result)
        })
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});



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
const SearchRouter = require('./api/search');

// for accepting post form data
const bodyParser = require('express').json;
app.use(bodyParser());
app.use(cors(corsOptions));
app.use(cookieParser()); 

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
app.use("/search", SearchRouter);


app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})