import {v4} from 'uuid';
const express =require("express");
const httpCode = require('http-status-codes');

const app = express();
app.use(express.json());
app.get('/test',(req,res) => {
    res.json('Hello testing :D')
});

app.post('/student/save',(req,res) =>{
    const body = req.body;
    if(body.email === null){
        res.status(httpCode.BAD_REQUEST).json({
            status:'error',
            message:'email is null'
        });
    }
    if(body.password !== body.confirm_password){
        res.status(httpCode.BAD_REQUEST).json({
            status:'error',
            message:'Passwords don´t match'
        });
    }
    res.json({
        status:'success',
        message:'Success transaction',
        id_student: v4()
    });
});

app.post('/login',(req,res) => {
    const body = req.body;
    if(body.email == null || body.password == null){
        res.status(httpCode.BAD_REQUEST).json({
            status:'error',
            message:'param in request is null'
        });
    }
    res.json({
        status:'success',
        message:'Success login',
        is_valid: true
    });
});

app.post('/student/course-assignment',(req,res) => {
    const body = req.body;

    if(body.id_student === null || body.course === null || body.section === null || body.day === null || body.time_course === null || body.id_student === null){
        res.status(httpCode.BAD_REQUEST).json({
            status:'error',
            message:'param in request is null'
        });
    }

    res.json({
        status:'success',
        message:'Success transaction',
        id_assignment: v4()
    });
});
export default app;